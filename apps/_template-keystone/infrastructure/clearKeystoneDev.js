const { spawn } = require('child_process');
const fs = require('fs/promises'); // Changed to fs/promises
const fsSync = require('fs'); // Keep fs for sync operations like watch and existsSync where promises are not suitable or for initial checks
const path = require('path');

const keystoneDir = path.join(__dirname, '../.keystone');
const schemaPath = path.join(keystoneDir, 'schema.graphql');
const typesPath = path.join(keystoneDir, 'types.ts');
const adminPath = path.join(keystoneDir, 'admin');

if (!fsSync.existsSync(keystoneDir)) { // Using fsSync for initial check
  fsSync.mkdirSync(keystoneDir); // Using fsSync for initial creation
}

const clearKeystoneDev = async () => { // Made async
    if (fsSync.existsSync(schemaPath)) { // Using fsSync for initial check
        await fs.writeFile(schemaPath, ''); // Using fs/promises
    }

    if (fsSync.existsSync(typesPath)) { // Using fsSync for initial check
         await fs.writeFile(typesPath, ''); // Using fs/promises
    }

    if (fsSync.existsSync(adminPath)) { // Using fsSync for initial check
        const files = await fs.readdir(adminPath, { withFileTypes: true }); // Using fs/promises
        for (const file of files) {
            const filePath = path.join(adminPath, file.name);
             
            if (file.isDirectory()) {
                  
                await fs.rm(filePath, { recursive: true, force: true }); // Using fs/promises
            } else {
                await fs.unlink(filePath); // Using fs/promises
            }
        }
    }
};

const clearNextDev = async () => { // Made async
    const nextDir = path.join(__dirname, '../.next');
    if (fsSync.existsSync(nextDir)) { // Using fsSync for initial check
          
        await fs.rm(nextDir, { recursive: true, force: true }); // Using fs/promises
    }
}


const clearBuild = async () => { // Made async
    const buildDir = path.join(__dirname, '../dist');
    if (fsSync.existsSync(buildDir)) { // Using fsSync for initial check
          
        await fs.rm(buildDir, { recursive: true, force: true }); // Using fs/promises
    }
}

// Watch for changes in schema.prisma
const prismaSchema = path.join(__dirname, '../schema.prisma');
const schemaPrisma = path.join(__dirname, '../schema.graphql');

if (fsSync.existsSync(prismaSchema)) { // Using fsSync for initial check
    const schema = fsSync.readFileSync(prismaSchema, 'utf8'); // Using fsSync for initial read
    if (fsSync.existsSync(schemaPrisma)) { // Using fsSync for initial check
        const currentSchema = fsSync.readFileSync(schemaPrisma, 'utf8'); // Using fsSync for initial read
        if (schema !== currentSchema) {
            fsSync.writeFileSync(schemaPrisma, schema); // Using fsSync for initial write
        }
    } else {
        fsSync.writeFileSync(schemaPrisma, schema); // Using fsSync for initial write
    }
}

// Watch for changes in the schema folder
const schemaFolder = path.join(__dirname, '../schema');

fsSync.watch(schemaFolder, { recursive: true }, (eventType, filename) => { // fs.watch is sync
    if (filename && filename.endsWith('.ts')) {
        console.log(`Schema changed: ${filename}`);
        clearKeystoneDev();
    }
});

clearKeystoneDev();
clearNextDev();
clearBuild();

const PRESERVED_ROUTES = ['_app.js', '_document.js', 'index.js', 'signin.js', 'no-access.js', 'api', 'init.js', '_error.js', '404.js', '[listKey]'];

async function ensureDummyFiles(dir) { // Made async
  if (!fsSync.existsSync(dir)) { // Using fsSync for initial check
    await fs.mkdir(dir, { recursive: true }); // Using fs/promises
  }
  
  const filesToDummy = ['index', 'signin'];
  for (const name of filesToDummy) { // Changed to for...of for await
    const originalPath = path.join(dir, `${name}_original.js`);
    if (!fsSync.existsSync(originalPath)) { // Using fsSync for initial check
      await fs.writeFile(originalPath, 'export default function Dummy() { return null; }'); // Using fs/promises
      // console.log(`Created dummy file to prevent compilation error: ${originalPath}`);
    }
  }
}

async function deleteGeneratedPages(dir) { // Made async
  if (!fsSync.existsSync(dir)) return; // Using fsSync for initial check
  
  let hasChanges = false;
  const files = await fs.readdir(dir, { withFileTypes: true }); // Using fs/promises
  const sourceAdminPagesDir = path.join(__dirname, '../admin/pages');

  for (const file of files) { // Changed to for...of for await
    const filePath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
       if (PRESERVED_ROUTES.includes(file.name)) continue;
       
       try {
            
           await fs.rm(filePath, { recursive: true, force: true }); // Using fs/promises
           console.log(`\nDeleted generated folder: ${file.name}`);
           hasChanges = true;
       } catch (e) {
           // Ignore race conditions
       }
    } else if (file.isFile() && file.name.endsWith('.js') && !file.name.endsWith('_original.js')) {
      // Skip _app.js - it needs to stay as-is for the @_app_original webpack alias
      if (file.name === '_app.js') continue;
      
      const tsxPath = path.join(sourceAdminPagesDir, file.name.replace(/\.js$/, '.tsx'));
      if (fsSync.existsSync(tsxPath)) { // Using fsSync for initial check
        const originalPath = filePath.replace(/\.js$/, '_original.js');
        const isDummy = fsSync.existsSync(originalPath) && (await fs.readFile(originalPath, 'utf8')).includes('Dummy'); // Using fsSync for exists, fs/promises for read
        
        try {
            if (!fsSync.existsSync(originalPath) || isDummy) { // Using fsSync
              if (fsSync.existsSync(originalPath)) {
                  fsSync.unlinkSync(originalPath); // Using fsSync
              }
              fsSync.renameSync(filePath, originalPath); // Using fsSync for rename (simple)
              console.log(`\nRenamed generated file: ${file.name} -> _original.js (Using custom override)`);
              hasChanges = true;
            } else {
              await fs.unlink(filePath); // Using fs/promises
              // console.log(`\nDeleted duplicate generated file: ${file.name}`);
              hasChanges = true;
            }
        } catch (e) {
            // Ignore race conditions
        }
      }
    }
  }
  
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

async function runKeystoneDev() {
  return new Promise(async (resolve, reject) => {
    const adminPagesDir = path.join(__dirname, '../.keystone/admin/pages');
    
    // Ensure directory exists for watcher
    await ensureDummyFiles(adminPagesDir);

    // Initial cleanup to remove stale files or fix state before start
    console.log('Running initial cleanup...');
    await deleteGeneratedPages(adminPagesDir);

    // Watch for file changes (generation)
    // Debounce to batch multiple file writes into one cleanup pass
    const debouncedCleanup = debounce(() => {
        deleteGeneratedPages(adminPagesDir);
    }, 300);

    const watcher = fsSync.watch(adminPagesDir, { recursive: true }, (eventType, filename) => {
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
