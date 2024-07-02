const fs = require('fs');


if (process.argv.length !== 3) {
  console.error('Usage: node script.js <file_path> <newName>');
  process.exit(1);
}


const newName = process.argv[2];

// Read the TypeScript file content
const filePath = 'libs/modules/custom-templates/src/lib/custom-templates.module.ts'; // Replace with the actual file path
let fileContent = fs.readFileSync(filePath, 'utf8');

// Define the replacements
const replacements = [
  { from: 'evt', to: newName }
];

// Perform the replacements
replacements.forEach(({ from, to }) => {
  const regex = new RegExp(from, 'g');
  fileContent = fileContent.replace(regex, to);
});

// Write the modified content back to the file
fs.writeFileSync(filePath, fileContent);

console.log('Replacements completed.');
