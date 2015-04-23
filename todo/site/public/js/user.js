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

}

app.init_browser = function() {
if( browser.android ) {
$("#main div[data-role='content']").css({
bottom: 0
})
}
}
app.init = function() {
console.log('start user init')
bb.init()
app.init_browser()

var profile = new bb.model.GetUser();
profile.fetch();
profile.bind('reset', function () { 
$('#proname').val(profile.toJSON()[0].name);
$('#prousername').val(profile.toJSON()[0].username);
$('#proemail').val(profile.toJSON()[0].email);
});
// app.router = new bb.router;
// Backbone.history.start();
console.log('end user init')
}
$(app.init)

_.templateSettings = {
interpolate: /\{\{(.+?)\}\}/g,
escape: /\{\{-(.+?)\}\}/g,
evaluate: /\{\{=(.+?)\}\}/g
};