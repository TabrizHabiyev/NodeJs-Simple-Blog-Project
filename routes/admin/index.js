const express = require('express')
const router = express.Router()


  router.get('/new', (req, res) => {
     res.redirect('/site/admin')
  })

  module.exports =  router;