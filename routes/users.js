const express = require('express')
const router = express.Router()
const User = require('../models/user')

 // Render register page 
  router.get('/register', (req, res) => {
    if (req.session.UserId) {
        return  res.redirect('/')
       }
    res.render('site/register')
  })

  ///Register
  router.post('/register', (req, res) => {
    User.create(req.body,(err,user)=>{
        res.redirect('/')
    })
  })


  //Login
  router.get('/login', (req, res) => {
    res.render('site/login')
  })

  router.post('/login', (req, res) => {
    const{email,password} = req.body
    User.findOne({email},(err,user)=>{
       if (user) {
           if (user.password == password) {
               //User session
              req.session.UserId = user._id
              res.redirect('/')
           }else{
               res.redirect('/users/login')
           }
       }else{
               res.redirect('/users/register')
       }
    })
  })


module.exports = router;