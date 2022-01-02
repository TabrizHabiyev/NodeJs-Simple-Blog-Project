const path = require('path')
const express = require('express')
const app = express()
const port = 3000


app.use(express.static('www'))


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname,'site/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
