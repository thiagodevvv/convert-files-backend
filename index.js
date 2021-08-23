const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3000

const libre = require('libreoffice-convert')
const path = require('path')
const fs = require('fs')


function convertFiles (req,res) {
  const extend = '.pdf'
  const enterPath = path.join(__dirname, '/resources/curriculo.docx')
  const outputPath = path.join(__dirname, `/resources/example${extend}`)

  
  // Read file
  const file = fs.readFileSync(enterPath)
  // Convert it to pdf format with undefined filter (see Libreoffice doc about filter)
  libre.convert(file, extend, undefined, (err, done) => {
      if (err) {
        console.log(`Error converting file: ${err}`)
      }

      // Here in done you have pdf file which you can save or transfer in another stream
      fs.writeFileSync(outputPath, done)
      return res.sendFile(outputPath)
  })
}





app.use(cors())
app.post('/',convertFiles)
app.listen(PORT, () => console.log(`Server is started in port: ${PORT}`))