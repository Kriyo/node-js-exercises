var uuid    = require('node-uuid')
var mongoose = require('mongoose')
var todocoll = mongoose.model('Post')
var util = {}

util.validate = function( input ) {
  return input.text
}

util.fixid = function( doc ) {
  if( doc._id ) {
    doc.id = doc._id.toString()
    delete doc._id
  }
  else if( doc.id ) {
    doc._id = new mongodb.ObjectID(doc.id)
    delete doc.id
  }
  return doc
}


  exports.create = function( req, res ) {
    var input = req.body
    console.log(input);
    if( !util.validate(input) ) {
      return res.send$(400, 'invalid')
    }
  
    todo=new todocoll({
      text: input.text,
      createdAt: new Date().getTime(),
      location: input.location,
      user: req.user,
    })
    todo.save(function (err) {
    if (err) console.log(err)
      res.send( todo )
      })
  },


  exports.read= function( req, res ) {
    var input = req.query
    
    todocoll.find({'_id':  input.id}, null, null, function(error, result){
    if(error) {
        console.log(error);
    } else {
        res.send(result)
    }
  });
  },


  exports.list= function( req, res ) {
    var input = req.query
    var options = {sort:[['_id','desc']]}
    todocoll.find({'user':  req.user}, null, null, function(error, result){
    if(error) {
        console.log(error);
    } else {
        res.send(result)
    }
  });
  },


  exports.update= function( req, res ) {
    var id    = req.query.id
    var input = req.body
    todocoll.update({
    _id: id
        }, {
    text:input.text,
    location:input.location
  }, 
  function(e, result) {
    if (e) {
      res.send(e.message);
    }
    else {
        res.send(result)
    }
  });
  },


  exports.del= function( req, res ) {
    var input = req.query.id
    console.log(input)
    todocoll.remove( {_id:input}, function(e, result) {
    if (e) {
      console.log(e)
      res.send(e.message);
    }
    else {
      console.log(result)
      res.send(result)
    }
  });
  }


