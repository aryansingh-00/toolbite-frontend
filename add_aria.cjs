const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src');
let updated = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  content = content.replace(/<button([^>]*)>/g, (match, attrs) => {
    if (!attrs.includes('title=') && !attrs.includes('aria-label=')) {
      changed = true;
      return `<button title="Interactive Button" aria-label="Interactive Button"${attrs}>`;
    }
    return match;
  });
  
  if (changed) {
    fs.writeFileSync(file, content);
    updated++;
    console.log('Updated:', path.basename(file));
  }
});

console.log('Total files updated:', updated);
