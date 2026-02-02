const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PRESERVED_ROUTES = ['_app.js', '_document.js', 'index.js', 'signin.js', 'no-access.js', 'api', 'init.js', '_error.js', '404.js', '[listKey]'];

function ensureDummyFiles(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const filesToDummy = ['_app', 'index', 'signin'];
  filesToDummy.forEach(name => {
    const originalPath = path.join(dir, `${name}_original.js`);
    if (!fs.existsSync(originalPath)) {
      fs.writeFileSync(originalPath, 'export default function Dummy() { return null; }');
      // console.log(`Created dummy file to prevent compilation error: ${originalPath}`);
    }
  });
}

function deleteGeneratedPages(dir) {
  if (!fs.existsSync(dir)) return;
  
  let hasChanges = false;
  const files = fs.readdirSync(dir, { withFileTypes: true });
  const sourceAdminPagesDir = path.join(__dirname, '../admin/pages');

  files.forEach(file => {
    const filePath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
       if (PRESERVED_ROUTES.includes(file.name)) return;
       
       try {
           fs.rmSync(filePath, { recursive: true, force: true });
           console.log(`\nDeleted generated folder: ${file.name}`);
           hasChanges = true;
       } catch (e) {
           // Ignore race conditions
       }
    } else if (file.isFile() && file.name.endsWith('.js') && !file.name.endsWith('_original.js')) {
      const tsxPath = path.join(sourceAdminPagesDir, file.name.replace(/\.js$/, '.tsx'));
      
      if (fs.existsSync(tsxPath)) {
        const originalPath = filePath.replace(/\.js$/, '_original.js');
        const isDummy = fs.existsSync(originalPath) && fs.readFileSync(originalPath, 'utf8').includes('Dummy');
        
        try {
            if (!fs.existsSync(originalPath) || isDummy) {
              if (fs.existsSync(originalPath)) fs.unlinkSync(originalPath);
              fs.renameSync(filePath, originalPath);
              console.log(`\nRenamed generated file: ${file.name} -> _original.js (Using custom override)`);
              hasChanges = true;
            } else {
              fs.unlinkSync(filePath);
              // console.log(`\nDeleted duplicate generated file: ${file.name}`);
              hasChanges = true;
            }
        } catch (e) {
            // Ignore race conditions
        }
      }
    }
  });
  
  if (hasChanges) {
      console.log('Cleanup applied to generated files.');
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function runKeystoneDev() {
  return new Promise((resolve, reject) => {
    const adminPagesDir = path.join(__dirname, '../.keystone/admin/pages');
    
    // Ensure directory exists for watcher
    ensureDummyFiles(adminPagesDir);

    // Initial cleanup to remove stale files or fix state before start
    console.log('Running initial cleanup...');
    deleteGeneratedPages(adminPagesDir);

    // Watch for file changes (generation)
    // Debounce to batch multiple file writes into one cleanup pass
    const debouncedCleanup = debounce(() => {
        deleteGeneratedPages(adminPagesDir);
    }, 300);

    const watcher = fs.watch(adminPagesDir, { recursive: true }, (eventType, filename) => {
        if (filename && !filename.includes('_original.js')) {
            debouncedCleanup();
        }
    });

    console.log(`\nWatching for generated pages in ${adminPagesDir}...`);

    const keystoneProcess = spawn('pnpm', ['keystone', 'dev'], {
      env: { ...process.env, NODE_ENV: 'development' },
      stdio: 'inherit'
    });

    keystoneProcess.on('exit', (code) => {
      watcher.close();
      console.log(`Keystone process exited with code ${code}`);
      if (code !== 0) {
        reject(new Error(`Keystone process exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

async function main() {
  try {
    await runKeystoneDev();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
}

main();
