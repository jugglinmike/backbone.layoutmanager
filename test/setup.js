(function(window) {
"use strict";

/* 
 * Test Module: Setup
 * Ensures that Layouts and Views can be set up correctly to work with
 * LayoutManager.
 *
 */
suite("setup");
beforeEach(function() {
  // Backbone.LayoutManager constructor.
  this.Layout = Backbone.Layout;

  // Enhanced Backbone.View.
  this.View = Backbone.View.extend({
    manage: true
  });

  // Normal Backbone.View.
  this.NormalView = Backbone.View.extend();

  // Shortcut the setupView function.
  this.setupView = this.Layout.setupView;
});

test("layout constructor", function() {
  var layout = new this.Layout({
    template: "test"
  });

  // Is a Backbone.View.
  assert.ok(layout instanceof Backbone.View, "Is a Backbone.View");
  // Ensure the layout has a views object container.
  assert.ok(_.isObject(layout.views), "Contains a views object");
  // Ensure the layout has a __manager__ object.
  assert.ok(_.isObject(layout.__manager__), "Contains a __manager__ object");
  // Has the correct template property set.
  assert.equal(layout.options.template, "test", "Has the correct template property");
  // Has the setViews function.
  assert.ok(_.isFunction(layout.setViews), "Has the setViews function");
  // Has the view function.
  assert.ok(_.isFunction(layout.setView), "Has the setView function");
  // Has the getAllOptions function.
  assert.ok(_.isFunction(layout.getAllOptions), "Has the getAllOptions function");
});

test("view setupView", function() {
  var view = new this.View({
    template: "test"
  });

  // Is a Backbone.View.
  assert.ok(view instanceof Backbone.View, "Is a Backbone.View");
  // Ensure the view has a views object container.
  assert.ok(_.isObject(view.views), "Contains a views object");
  // Ensure the view has a __manager__ object.
  assert.ok(_.isObject(view.__manager__), "Contains a __manager__ object");
  // Has the correct template property set.
  assert.equal(view.options.template, "test", "Has the correct template property");
  // Has the setViews function.
  assert.ok(_.isFunction(view.setViews), "Has the setViews function");
  // Has the view function.
  assert.ok(_.isFunction(view.setView), "Has the setView function");
  // Has the getAllOptions function.
  assert.ok(_.isFunction(view.getAllOptions), "Has the getAllOptions function");
});

test("setupView does not copy all options to instance", function() {
  var view = new Backbone.View({
    test: "this"
  });
  
  Backbone.Layout.setupView(view);

  assert.notEqual(view.test, "this", "View should not have options copied to instance");
});

test("Error exception is properly raised when vanilla View is used", function() {
  var layout = new this.Layout({
    template: "test"
  });

  var view = new this.NormalView();

  try {
    layout.insertView(view); 
  } catch (ex) {
    assert.equal(ex.message, "Please set `View#manage` property with selector '' to `true`.", "Correct message");
  }
});

test("`setView` exists on `Backbone.View` with `manage:true` set", function() {
  var view = new Backbone.View({ manage: true });
  var anotherView = new Backbone.View({ manage: true });

  assert.equal(typeof view.setView, "function", "setView is a function");
});

})(typeof global !== "undefined" ? global : this);
