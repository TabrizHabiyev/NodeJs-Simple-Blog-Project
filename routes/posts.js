const express = require('express')
const router = express.Router()
const Post = require('../models/post')


  router.get('/new', (req, res) => {
    res.render('site/addPost')
  })

  router.post('/test', (req, res) => {
    Post.create(req.body)
    res.redirect('/')
  })

   
  module.exports = router;