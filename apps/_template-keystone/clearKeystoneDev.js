const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function deleteDuplicateJsFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach(file => {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      deleteDuplicateJsFiles(filePath); // Recursive for nested folders
    } else if (file.isFile() && file.name.endsWith('.js')) {
      const tsxFilePath = filePath.replace(/\.js$/, '.tsx');
      if (filePath.includes('_app')) return;
      if (fs.existsSync(tsxFilePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted duplicate JS file: ${filePath}`);
      }
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

    // Perform the cleanup after Keystone is ready
    deleteDuplicateJsFiles(adminPagesDir);

    // Optional: Keep Keystone running, or kill it if you want to stop after cleanup
    // keystoneProcess.kill();
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

main();
