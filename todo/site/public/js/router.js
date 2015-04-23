"use strict";
window.bb = window.APP || {};
bb.Router = Backbone.Router.extend({
  routes: {
    "todo/new": "create",
    "todo/index": "index",
    "todo/signin": "signin",
    "todo/signup": "signup",
    "todo/:id/edit": "edit",
    "todo/:id/view": "show"
  },

  initialize: function (options) {
    app.model.items=new bb.model.Items()
    app.view.Head = new bb.view.Head(app.model.items)
    app.view.list = new bb.view.List(app.model.items)
    app.view.list.render()
    this.index();
  },

  updateDebug: function () {
    $('#output').text(JSON.stringify(this.notes.toJSON(), null, 4));
  },

  create: function () {
    this.currentView = new APP.NoteNewView({
      notes: this.notes, note: new APP.NoteModel()
    });

    $('#primary-content').html(this.currentView.render().el);
  },

  edit: function (id) {
    var note = this.notes.get(id);
    this.currentView = new APP.NoteEditView({note: note});
    $('#primary-content').html(this.currentView.render().el);
  },

  show: function (id) {
    var note = this.notes.get(id);
    this.currentView = new APP.NoteShowView({
      note: note
    });
    $('#primary-content').html(this.currentView.render().el);
  },

  index: function () {
    this.currentView = new bb.view.List(app.model.items);

   
    $('#primary-content').html(this.currentView.render().el);
    // we would call to the index with
    // this.notes.fetch()
    // to pull down the index json response to populate our collection initially
  }
});
