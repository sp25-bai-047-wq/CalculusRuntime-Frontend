import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '../src');

function walk(dir, callback) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      walk(itemPath, callback);
    } else {
      callback(itemPath);
    }
  }
}

walk(path.join(srcDir, 'pages'), (filePath) => {
  if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.replace(/import\s+StudyGuideShell\s+from\s+["']\.\/StudyGuideShell["']/g, 'import StudyGuideShell from "../courses/StudyGuideShell"');
  content = content.replace(/import\s+StudyGuideShell\s+from\s+["']\.\.\/StudyGuideShell["']/g, 'import StudyGuideShell from "../courses/StudyGuideShell"');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated StudyGuideShell in: ${path.relative(srcDir, filePath)}`);
  }
});

console.log('StudyGuideShell paths fixed.');
