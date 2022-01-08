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
    const email = req.body.email;
    
    User.findOne({email},(err,user)=>{
        if (user) {
            if (user.email == email) {
                req.session.sessionFlash ={
                    type:'alert alert-danger',
                    message: 'User successfully created . You can login now'
                  }
                res.redirect('/users/register')
            }else{
                User.create(req.body,(err,user)=>{
                    req.session.sessionFlash ={
                        type:'alert alert-success',
                        message: 'User successfully created . You can login now'
                      }
                    res.redirect('/users/login')
                })
            }
        }else{
                res.redirect('/users/register')
        }
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


    //Login out
    router.get('/logout', (req, res) => {
      req.session.destroy(()=>{
        res.redirect('/')
      })
    })

module.exports = router;