const cors = require('cors')
const express = require('express')
const app = express()





const libre = require('libreoffice-convert');
 
const path = require('path');
const fs = require('fs');
 
const extend = '.pdf'
const enterPath = path.join(__dirname, '/resources/curriculo.docx');
const outputPath = path.join(__dirname, `/resources/example${extend}`);

 
// Read file
const file = fs.readFileSync(enterPath);
// Convert it to pdf format with undefined filter (see Libreoffice doc about filter)
libre.convert(file, extend, undefined, (err, done) => {
    if (err) {
      console.log(`Error converting file: ${err}`);
    }

    // Here in done you have pdf file which you can save or transfer in another stream
    fs.writeFileSync(outputPath, done);
});