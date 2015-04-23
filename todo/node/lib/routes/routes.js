(function (exports) {
  "use strict";
  var mongoose = require('mongoose')
    , crudUtils = require('../utils/crudUtils')
    , post = mongoose.model('Post')
    , posts = require('../controller/posts')
    , users = require('../controller/users')
    ,path = require('path')

  function index(req, res) {
    
    if(req.user){
     res.sendfile( path.resolve('././site/public/todo.html'));
    }
    res.sendfile( path.resolve('././site/public/login.html'));

  }
  function signup(req, res) {
    console.log(req.user)
    if(req.user){
      res.sendfile( path.resolve('././site/public/todo.html'));
    }
    res.sendfile( path.resolve('././site/public/signup.html'));

  }
  function userlogin(req, res) {
    if(req.user){
      res.sendfile( path.resolve('././site/public/todo.html'));
    }
    res.sendfile( path.resolve('././site/public/login.html'));

  }
  exports.init = function (app, auth, passport) {
    //app.get('/',index);
    app.get('/', function (req, res)
    {
      if(req.user!=null){
        res.render('todo.html');
      }
      if(req.user==null)
      {
        res.redirect('/userlogin');
      }
      
    });

    app.get('/',index);
    app.get('/signup',signup);
    app.get('/userlogin',userlogin);
    app.get('/userprofile', users.userprofile);
    app.get('/login', users.login);
    app.get('/signup', users.signup);
    app.get('/logout', users.logout)
    app.post('/users', users.create)
    app.post('/todo/add', posts.create)
    app.get('/todo/list', posts.list)
    app.get('/todo/read', posts.read)
    app.post('/todo/update', posts.update)
    app.post('/todo/delete', posts.del)
    app.get('/auth/facebook', passport.authenticate('facebook', { failureRedirect: '/userlogin',scope: 'email'}), users.signin)
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/userlogin' }), users.authCallback)
    app.get('/auth/twitter', passport.authenticate('twitter', { failureRedirect: '/userlogin'}), users.signin)
    app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/userlogin' }), users.authCallback)

    app.post('/users/session', passport.authenticate('local', {failureRedirect: '/userlogin', failureFlash: 'Invalid email or password.'}), users.session)
    crudUtils.initRoutesForModel({ 'app': app, 'model': post, auth: auth });
  };
}(exports));