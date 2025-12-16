import archiver from 'archiver';
import { createWriteStream, rmSync, mkdirSync, cpSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a temp directory for production build
const tempDir = join(__dirname, '.temp-prod');

console.log('Creating production build...');

// Clean temp dir if exists
if (existsSync(tempDir)) {
  rmSync(tempDir, { recursive: true });
}
mkdirSync(tempDir);

// Copy package.json
cpSync(join(__dirname, 'package.json'), join(tempDir, 'package.json'));

// Copy dist folder
cpSync(join(__dirname, 'dist'), join(tempDir, 'dist'), { recursive: true });

// Install production dependencies in temp dir
console.log('Installing production dependencies...');
execSync('npm install --omit=dev', { cwd: tempDir, stdio: 'inherit' });

// Create zip
console.log('Creating zip file...');
const output = createWriteStream(join(__dirname, 'function.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`Created function.zip (${(archive.pointer() / 1024 / 1024).toFixed(2)} MB)`);
  // Clean up temp dir
  rmSync(tempDir, { recursive: true });
  console.log('Cleaned up temp directory');
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// Add dist folder
archive.directory(join(tempDir, 'dist'), 'dist');

// Add node_modules (production only)
archive.directory(join(tempDir, 'node_modules'), 'node_modules');

// Add package.json
archive.file(join(tempDir, 'package.json'), { name: 'package.json' });

archive.finalize();
