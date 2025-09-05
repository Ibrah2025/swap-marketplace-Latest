const fs = require('fs');

const content = `
console.log("Main.js loading");

const app = document.getElementById("app");
app.innerHTML = "<h1>SWAP Test</h1><p>If you see this, the file is working!</p>";
`;

fs.writeFileSync('./src/main.js', content, 'utf8');
console.log('File written successfully');
