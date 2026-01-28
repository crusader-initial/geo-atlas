const fs = require('fs');
const path = require('path');

const targetDir = '/Users/cyrus/project/geo-atlas/apps/taro/src/data/china/geometryCouties';

if (!fs.existsSync(targetDir)) {
  console.error(`Directory not found: ${targetDir}`);
  process.exit(1);
}

const files = fs.readdirSync(targetDir);

let renamedCount = 0;

files.forEach(file => {
  if (file.endsWith('00.json')) {
    const oldPath = path.join(targetDir, file);
    // Remove the last two characters before .json
    // file is "445200.json"
    // name part is "445200"
    const namePart = path.basename(file, '.json');
    if (namePart.endsWith('00')) {
        const newNamePart = namePart.slice(0, -2);
        const newFilename = newNamePart + '.json';
        const newPath = path.join(targetDir, newFilename);

        // Check if target file already exists to avoid overwriting (unless intended, but here we are renaming)
        if (fs.existsSync(newPath)) {
            console.warn(`Skipping ${file} -> ${newFilename}: Target file already exists.`);
        } else {
            fs.renameSync(oldPath, newPath);
            console.log(`Renamed: ${file} -> ${newFilename}`);
            renamedCount++;
        }
    }
  }
});

console.log(`Total files renamed: ${renamedCount}`);
