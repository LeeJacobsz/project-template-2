(function () {
// Global scope protection - NOTE! - this only works when the files are concat in the correct order!


// Set up App namespace and structure

var App = {};

App.Controllers = {};
App.Widgets = {};
App.State = {};


// Helper functions


// Identity Function
//
// Just passes back whatever you gave it

var id = function (it) { return it; };


// Functional Log
//
// Logs, but passes it's first argument through as well
var log = function () { console.log.apply(console, arguments); return arguments[0]; };


// Swallow Event
//
// Prevent an event from bubbling.
// High-functional version - use it on the event handling function itself.
//
// $(something).on('click', swallow(function () {
//		event handler here ...
// }));

function swallow (fn) {
	return function (event) {
	  event.preventDefault();
	  event.stopPropagation();
	  fn.apply(this, arguments);
	};
}


// Smooth Anchor
//
// Given an ID of an element on the page, will smoothly scroll to the top
// of that location.

function smoothScrollTo (anchorId) {
 var $target = $(anchorId),
     offset  = $target.offset().top;
  $('html,body').animate({ scrollTop: offset }, 200);
}


// Sequential ID Generator

var newId = (function () {
  var i = 0;
  return function () {
    return i++;
  };
}());


// Global desktop mode interrogator

function isDesktop () {
  return $(window).width() >= 1080;
}


// Widgets Store
//
// Each time we make a widget, store it by it's ID. That way, we
// can look them up later from their dom elements if we need to.

App.Widgets.All = {};

// Retreive widget if we have it's host dom
App.Widgets.get = function ($host) {
  return App.Widgets.All[ $host.data('widget-id') ];
};


// Base widget
//
// Does all the boring setup stuff that every widget must do to function.
// Changing this will affect any other widgets

App.Widgets.Base = function Widget ($host) {
  this.dom    = { main: $host };
  this.config = $host.data();
  this.type   = this.config.widget;
  this.id     = newId();

  // Store
  App.Widgets.All[this.id] = this;
  this.dom.main.attr('data-widget-id', this.id);

  log('New widget:', this.type, this.id, this.dom.main[0]);
};

// Begin concatting other files....