import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '../src');

const mvDir = path.join(srcDir, 'pages', 'multivariableCalculus');
const files = fs.readdirSync(mvDir);

for (const file of files) {
  if (!file.endsWith('.js') && !file.endsWith('.jsx')) continue;
  const filePath = path.join(mvDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.replace(/from\s+["']\.\/calculus\//g, 'from "../calculus/');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated calculus path in: ${file}`);
  }
}

console.log('Multivariable calculus paths fixed.');
