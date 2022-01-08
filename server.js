const path = require('path')
const express = require('express')
const app = express()
const exphbs  = require('express-handlebars')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const generateDate = require('./helpers/generateDate').generateDate
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');


//Database MongoDB Connection
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://tabriz_habiyev:tabriz_habiyev@cluster0.bpd6t.mongodb.net/MongoDB?retryWrites=true&w=majority');


app.use(expressSession({
  secret: 'testesto',
  resave:false,
  saveUninitialized:true,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://tabriz_habiyev:tabriz_habiyev@cluster0.bpd6t.mongodb.net/MongoDB?retryWrites=true&w=majority'
  })
}))


// Flash message Midilware
app.use((req,res,next)=>{
  res.locals.sessionFlash = req.session.sessionFlash
  delete req.session.sessionFlash
  next()
})

app.use(fileUpload())

const port = 3000

app.use(express.static('www'))

app.engine('handlebars', exphbs.engine({helpers:{generateDate:generateDate}}))
app.set('view engine', 'handlebars');


// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))

// create application/json parser
app.use(jsonParser = bodyParser.json())

const main = require('./routes/main')
const posts = require('./routes/posts')
const users = require('./routes/users')
app.use('/',main)
app.use('/posts',posts)
app.use('/users',users)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
