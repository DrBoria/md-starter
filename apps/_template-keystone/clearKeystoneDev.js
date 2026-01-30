const { exec } = require('child_process');
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
       
       // It's likely a list folder (e.g. 'users', 'posts').
       // We want to DELETE it so that admin/pages/[listKey] handles it.
       // UNLESS there is a manual override in apps/_template-keystone/admin/pages/{name}
       // But wait, if there is a manual override, Next.js prefers the specific file anyway?
       // Yes, Next.js priority: specific > dynamic.
       // So if we have admin/pages/posts/index.tsx (which compiles to .keystone/.../posts/index.js??? No, user copies it? No, Keystone compiles from admin/pages mapping).
       
       // Actually, Keystone generates the pages. 
       // If we simply delete the generated folder, Next.js falling back to [listKey] is correct behavior.
       
       fs.rmSync(filePath, { recursive: true, force: true });
       console.log(`Deleted generated list generic folder to enable dynamic routing: ${filePath}`);
    }
  });
}


function runKeystoneDev() {
  return new Promise((resolve, reject) => {
    const keystoneProcess = exec('keystone dev');

    keystoneProcess.stdout.on('data', data => {
      console.log(`Keystone: ${data}`);
      
      // Check for the specific line that indicates Keystone has started
      if (data.includes('Admin UI ready') || data.includes('Keystone instance started')) {
        resolve(keystoneProcess); // Keystone is ready, resolve the promise
      }
    });

    keystoneProcess.stderr.on('data', data => {
      console.error(`Keystone Error: ${data}`);
    });

    keystoneProcess.on('exit', code => {
      if (code !== 0) {
        reject(new Error(`Keystone process exited with code ${code}`));
      }
    });
  });
}

async function main() {
  try {
    // Start keystone dev and wait for it to signal readiness
    await runKeystoneDev();

    // Directory to check for duplicate .js and .tsx files
    const adminPagesDir = './.keystone/admin/pages';

    // Perform the cleanup to force dynamic routing
    deleteGeneratedPages(adminPagesDir);

    // Optional: Keep Keystone running, or kill it if you want to stop after cleanup
    // keystoneProcess.kill();
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

main();
