

var mongoose = require('mongoose')
  , User = mongoose.model('User')

exports.signin = function (req, res) {
 
}


exports.authCallback = function (req, res, next) {
//var user = req.user;
//res.send(user);
 res.redirect('/')
}


exports.login = function (req, res) {
  console.log(req.user)
  res.send("invalid password or email");
}

exports.userprofile = function (req, res) {
  res.send(req.user);
}

exports.signup = function (req, res) {
}



exports.logout = function (req, res) {
  req.logout()
  return res.redirect('/userlogin')
}



exports.session = function (req, res) {
  console.log(req.session);
  res.redirect('/')
}



exports.create = function (req, res) {
    
  User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { return done(err) }
          if (!user) {
          var newuser = new User(req.body)
          newuser.provider = 'local'
          newuser.save(function (err) {
          if (err) {
            console.log(err.errors)
            res.send(err.errors)
          }
          res.redirect('/userlogin')
          })
        }
     if(user){
        res.send("user exist")
      } 
  })
  
 
}



exports.show = function (req, res) {
  var user = req.profile
  res.render('users/show', {
    title: user.name,
    user: user
  })
}



exports.user = function (req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      req.profile = user
      next()
    })
}
