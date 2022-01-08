const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const path = require('path')
const md5 = require('md5')
const post = require('../models/post')

  router.get('/new', (req, res) => {
    if (req.session.UserId) {
     return  res.render('site/addPost')
    }
     res.redirect('/users/login')
  })

  
  router.post('/test', (req, res) => {
    if (req.files) {
      let post_image = req.files.post_image
      let photo_name = `${md5(post_image.name)}${Math.random()}${Date.now()}.${post_image.name}`
      post_image.mv(path.resolve(__dirname,"../www/img/postimages",`${photo_name}`))
      Post.create({
          ...req.body,
          post_image:`/img/postimages/${photo_name}`
      })
      
      res.redirect('/')
    }else{
      res.redirect('/posts/new')
    }
   
  })

  router.get('/:id', (req, res) => {
    Post.findById(req.params.id).lean().then(post => {
      res.render('site/post' , {post:post})
    })
    
  })

  
  
  module.exports = router;