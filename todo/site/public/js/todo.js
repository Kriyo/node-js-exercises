function pd( func ) {
return function( event ) {
event.preventDefault()
func && func(event)
}
}

document.ontouchmove = pd()
var app = {
view: {},
model:{}
}
var bb = {
view: {},
model:{}
}

var browser = {
android: /Android/.test(navigator.userAgent)
}
browser.iphone = !browser.android

bb.router = Backbone.Router.extend({


routes: {
"facebookcall": "facebookcall",
'*path':  'defaultRoute'
},
defaultRoute: function(path) {
    window.location = '/todo.html';
},

facebookcall: function(req) {
// this.currentView = new APP.NoteIndexView({
//       notes: this.notes
//     });

console.log(req)

// app.view.list.render()
//$('#primary-content').html(this.currentView.render().el);
},

});



bb.init = function() {
var scrollContent = {
scroll: function() {
var self = this
setTimeout( function() {
if( self.scroller ) {
self.scroller.refresh()
}
else {
self.scroller = new iScroll( $("div[data-role='content']")[0] )
}
},1)
}
}
//model
bb.model.Item=Backbone.Model.extend(_.extend({
  defaults:{
  text:'',
  _id:'',
},
  initialize:function(){
    var self=this
    _.bindAll(self)
  }
}))

bb.model.User=Backbone.Model.extend(_.extend({
  defaults:{
  username:'',
  email:'',
},
  initialize:function(){
    var self=this
    _.bindAll(self)
  }
}))

bb.model.Items=Backbone.Collection.extend(_.extend({
  model:bb.model.Item,
  url: function(){
    if(this.requestmethod=="update"){
      return '/todo/update?id='+this.updateid;
    }
    if(this.requestmethod=="delete"){
      return '/todo/delete?id='+this.deleteid;
    }
    return '/todo/add';
  },
     
  initialize:function(){
    var self=this
    _.bindAll(self)
    self.count=0
    self.on('reset',function() {
        self.count = self.length
      })
},
  additem:function(thing,latitute,lontitute)
  {
    var self = this
      var item = new bb.model.Item({
        text: thing,
        location: {lat:latitute,lont:lontitute}
      })
      self.add(item)
      self.count++
      item.save(null, {
    success: function (model, response) {
         window.location = '/';
    },
    error: function (model, response) {
       window.location = '/todo.html';
    }
});
  },
  updateitem:function(thing,latitute,lontitute,id)
  {
    var self = this
      var item = new bb.model.Item({
        text: thing,
        location: {lat:latitute,lont:lontitute}
      })
      self.add(item)
      this.requestmethod='update';
      this.updateid=id;
      item.save(null, {
    success: function (model, response) {
        console.log("success");
    },
    error: function (model, response) {
       window.location = '/';
    }
});
  },

deleteitem:function(thing,latitute,lontitute,id)
  {
    var self = this
      var item = new bb.model.Item({
        text: thing,
        location: {lat:latitute,lont:lontitute}
      })
      self.add(item)
      this.requestmethod='delete';
      this.deleteid=id;
      item.save(null, {
    success: function (model, response) {
        window.location = '/';
    },
    error: function (model, response) {
       window.location = '/';
    }
});
  }
}))

bb.model.ItemList=Backbone.Collection.extend(_.extend({
    model: bb.model.Item,
    url:'/todo/list',
}))
bb.model.GetItem=Backbone.Collection.extend(_.extend({
    model: bb.model.Item,
    url:'/todo/read',
}))
bb.model.GetUser=Backbone.Collection.extend(_.extend({
    model: bb.model.User,
    url:'/userprofile',
}))
//views
bb.view.Head=Backbone.View.extend(_.extend({
  events:{
    'tap #add':function(){
      var self=this;
      var thing=self.input.val();
      var lat=self.inputlatitude.val();
      var lon=self.inputlontitute.val();
      self.items.additem(thing,lat,lon);
    },
    'tap #update':function(){
      var self=this;
      var upthing=self.upinput.val();
      var uplat=self.upinputlatitude.val();
      var uplon=self.upinputlontitute.val();
      self.items.updateitem(upthing,uplat,uplon,bb.view.Login.updating);
    },
    'tap #delete':function(){
      var self=this;
      var upthing=self.upinput.val();
      var uplat=self.upinputlatitude.val();
      var uplon=self.upinputlontitute.val();
      self.items.deleteitem(upthing,uplat,uplon,bb.view.Login.updating);
    },
    'tap #logout':function(){
      $.get( "/logout", function( ) {
      window.location = '/userlogin';
      });
    },

  },
  initialize:function(items){
    var self=this;
    _.bindAll(self);
    self.setElement("div[data-role='popup']");
    self.input = self.$("#new-todo");
    self.inputlatitude = self.$("#latitute");
    self.inputlontitute = self.$("#lontitute");
    self.upinput = self.$("#upnew-todo");
    self.upinputlatitude = self.$("#uplatitute");
    self.upinputlontitute = self.$("#uplontitute");
    self.items=items;
  }
}))
bb.view.Login=Backbone.View.extend(_.extend({
  events:{
    'tap #facebook':function(){
      window.location.href = 'auth/facebook';
    },
    'tap #twitter':function(){
      window.location.href = 'auth/twitter';
    },
     'tap #todoitem':function(el){
      bb.view.Login.updating=el.target.getAttribute('itemid');
      el.preventDefault()
      $('#myupdatePopup').popup('open')
      var readitem = new bb.model.GetItem();
      readitem.fetch({ data: $.param({ id: el.target.getAttribute('itemid')}) });
      readitem.bind('reset', function () {
        $('#upnew-todo').val(readitem.toJSON()[0].text);
       });
      //console.log(el.target);
    },
    
  },
  initialize:function(items){
    var self=this;
    _.bindAll(self);
    self.setElement("div[data-role='content']");
  }
}))

bb.view.List = Backbone.View.extend(_.extend({
initialize: function(items) {
var self = this
_.bindAll(self);
self.setElement('#list')
self.tm = {
item: _.template( self.$el.html() )
}
self.items=items
//self.items.on('add',self.appenditem)
},
render: function() {
var self = this
self.$el.empty()
self.items.each(function(item){
  self.appenditem(item)
})
},
appenditem:function(item){
  var self=this
  var html=self.tm.item(item.toJSON())
  self.$el.append(html)
  self.scroll()
}
},scrollContent))
}

app.init_browser = function() {
if( browser.android ) {
$("#main div[data-role='content']").css({
bottom: 0
})
}
}
app.init = function() {
console.log('start init')
bb.init()
app.init_browser()
app.model.items = new bb.model.Items()
app.view.Head = new bb.view.Head(app.model.items)
app.view.Login = new bb.view.Login(app.model.items)
app.view.list = new bb.view.List(app.model.items)
var pro = new bb.model.ItemList();
pro.fetch();
pro.bind('reset', function () { 
app.view.list = new bb.view.List(pro);
app.view.list.render() });

var profile = new bb.model.GetUser();
profile.fetch();
profile.bind('reset', function () { 
$('#proname').val(profile.toJSON()[0].name);
$('#prousername').val(profile.toJSON()[0].username);
$('#proemail').val(profile.toJSON()[0].email);
});
// app.router = new bb.router;
// Backbone.history.start();
console.log('end init')
}
$(app.init)

_.templateSettings = {
interpolate: /\{\{(.+?)\}\}/g,
escape: /\{\{-(.+?)\}\}/g,
evaluate: /\{\{=(.+?)\}\}/g
};