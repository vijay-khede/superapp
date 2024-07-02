const fs = require('fs');

 

const filePath = 'nx.json';

 

// Read the content of the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

 

  // Parse the JSON data
  let jsonData = JSON.parse(data);

 

  // Remove the "projects" property from the parsed JSON data
  delete jsonData.projects;

 

  // Convert the modified JSON back to a string
  const modifiedJson = JSON.stringify(jsonData, null, 2);

 

  // Write the modified JSON back to the file
  fs.writeFile(filePath, modifiedJson, 'utf8', err => {
    if (err) {
      console.error('Error writing to the file:', err);
      return;
    }
    console.log('Projects block removed successfully.');
  });
});
