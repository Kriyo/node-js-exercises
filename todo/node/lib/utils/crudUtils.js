
(function (exports) {
  "use strict";
  function errMsg(msg) {
    return {'error': {'message': msg.toString()}};
  }
  
  function getListController(model) {
    return function (req, res) {
      //console.log('list', req.body);
      model
        .find({})
        .populate("user", "username")
        .sort("createdAt")
        .lean()
        .exec(function (err, result) {
        if (!err) {
          var json;
          json=parseResults(result, req.user); 
          res.send(json);
        } else {
          res.send(errMsg(err));
        }
      });
    };
  }

  function parseResults(result, user){ 
  var id 
  if (user) id=user._id; 
   for (var i = result.length - 1; i >= 0; i--) { 
      if (!result[i].user)
        result[i].myPost=false;
      else if(String(id)==result[i].user || String(id)==result[i].user._id)
        result[i].myPost=true;
      else
        result[i].myPost=false;
    };
    return result
  }
  
  function getCreateController(model) {
    return function (req, res) {
      console.log(req.body)
      var m = new model(
        { body: req.body.body,
          title: req.body.title,
          createdAt: req.body.createdAt,
          user : req.user._id
        });
      
      console.log(m)
      m.save(function (err) {
        if (!err) {
          var sender=m.toJSON()
          sender.user={username:req.user.username}
          res.send(sender);
        } else {
          res.send(errMsg(err));
        }
      });
    };
  }

  
  function getReadController(model) {
    return function (req, res) {
      model.findById(req.params.id, function (err, result) {
        if (!err) {
          res.send(result);
        } else {
          res.send(errMsg(err));
        }
      });
    };
  }


  function getUpdateController(model) {
    return function (req, res) {
        var result=req.post, key;
        for (key in req.body) { //Update the keys
          if ("user"!=key)  //ignore the user key
          result[key] = req.body[key];
        }
        result.save(function (err) {
          if (!err) {
            var sender=result.toObject()
            if (req.user.username) sender.user={username:req.user.username};
            res.send(sender);
          } else {
            res.send(errMsg(err));
          }
        });
    };
  }

  function getDeleteController(model) {
    return function (req, res) {
          var result=req.post;
          result.remove();
          result.save(function (err) {
            if (!err) {
              res.send({});
            } else {
              res.send(errMsg(err));
            }
          });
    };
  }
  function postid(req, res, next, id){  
    var mongoose = require('mongoose'),
    Post = mongoose.model('Post');
    Post.load(id, function (err, post) {
      if (err) return next(err)
      if (!post) return next(new Error('Failed to load article ' + id))
      req.post = post
      next()
    })
  }

  exports.initRoutesForModel = function (options) {
    var app = options.app,
      model = options.model,
      auth= options.auth,
      path,
      pathWithId;

    if (!app || !model) {
      return;
    }

    path = options.path || '/' + model.modelName.toLowerCase();
    pathWithId = path + '/:id';
    app.get(path, getListController(model));
    app.get(pathWithId, getReadController(model));
    app.post(path, auth.requiresLogin, getCreateController(model));
    app.put(pathWithId, auth.requiresLogin, auth.post.hasAuthorization, getUpdateController(model));
    app.del(pathWithId, auth.requiresLogin, auth.post.hasAuthorization, getDeleteController(model));
    app.param('id', postid)
  };

}(exports));
