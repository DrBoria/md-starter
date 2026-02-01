const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PRESERVED_ROUTES = ['_app.js', '_document.js', 'index.js', 'signin.js', 'no-access.js', 'api', 'init.js', '_error.js', '404.js', '[listKey]']; // Dashboard is index.js

function deleteGeneratedPages(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach(file => {
    const filePath = path.join(dir, file.name);
    
    // If it's a directory and NOT in preserved routes (like 'api')
    if (file.isDirectory()) {
       if (PRESERVED_ROUTES.includes(file.name)) return;
       
       fs.rmSync(filePath, { recursive: true, force: true });
       console.log(`Deleted generated list generic folder to enable dynamic routing: ${filePath}`);
    } else if (file.isFile() && file.name.endsWith('.js') && !file.name.endsWith('_original.js')) {
      const tsxPath = filePath.replace(/\.js$/, '.tsx');
      if (fs.existsSync(tsxPath)) {
        const originalPath = filePath.replace(/\.js$/, '_original.js');
        if (!fs.existsSync(originalPath)) {
          fs.renameSync(filePath, originalPath);
          console.log(`Renamed duplicate generated .js file to _original.js: ${filePath} (using .tsx override)`);
        } else {
          fs.unlinkSync(filePath);
          console.log(`Deleted duplicate generated .js file (already have _original.js): ${filePath}`);
        }
      }
    }
  });
}

function runKeystoneDev() {
  return new Promise((resolve, reject) => {
    const keystoneProcess = spawn('pnpm', ['keystone', 'dev'], {
      env: { ...process.env, NODE_ENV: 'development' },
      stdio: ['inherit', 'pipe', 'inherit']
    });

    keystoneProcess.stdout.on('data', data => {
      const output = data.toString();
      process.stdout.write(output);
      
      // Check for the specific line that indicates Keystone has started
      if (output.includes('Admin UI ready') || output.includes('GraphQL API ready')) {
        // Perform the cleanup once ready
        const adminPagesDir = path.join(__dirname, '.keystone/admin/pages');
        deleteGeneratedPages(adminPagesDir);
        resolve(keystoneProcess);
      }
    });

    keystoneProcess.on('exit', code => {
      if (code !== 0) {
        console.error(`Keystone process exited with code ${code}`);
        process.exit(code);
      }
    });
  });
}

async function main() {
  try {
    await runKeystoneDev();
    console.log('Keystone is running and cleanup is done.');
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
}

main();
