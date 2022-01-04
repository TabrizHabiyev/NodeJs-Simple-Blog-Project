const path = require('path')
const express = require('express')
const app = express()
const exphbs  = require('express-handlebars')
const bodyParser = require('body-parser')

//Database MongoDB Connection
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://tabriz_habiyev:tabriz_habiyev@cluster0.bpd6t.mongodb.net/MongoDB?retryWrites=true&w=majority');



const port = 3000

app.use(express.static('www'))

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars');




// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))

// create application/json parser
app.use(jsonParser = bodyParser.json())

const main = require('./routes/main')
const posts = require('./routes/posts')
app.use('/',main)
app.use('/posts',posts)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
