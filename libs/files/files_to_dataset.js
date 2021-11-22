const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const folderPath = process.argv[2] ?? './';
    const resultName = process.argv[3] ?? 'RESULT.json';
    const files = await fs.promises.readdir(folderPath);
    const result = {};

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stat = await fs.promises.stat(filePath);
      if (!stat.isFile()) continue;
      if (file.split('.').pop() !== 'txt') continue;
      const content = await fs.promises.readFile(filePath);
      const items = fileToEntries(content);
      const description = items.shift().substring(1);
      const name = file.split('.').slice(0, -1).join('');
      result[name] = {
        name,
        description,
        items,
      };
    }

    const outputPath = path.join(folderPath, resultName);
    const output = JSON.stringify(result, null, 2);
    await fs.promises.writeFile(outputPath, output);
  } catch (e) {
    console.error('Cannot read files from folder');
  }
})();

function fileToEntries(content) {
  content = content.toString();
  const result = content.split('\n').flatMap(line => line.split('\t'));
  if (result[result.length - 1] === '') result.pop();
  return result;
}
