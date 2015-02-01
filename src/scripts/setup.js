(function () {
// Global scope protection - NOTE! - this only works when the files are concat in the correct order!


// Set up App namespace and structure

var App = {};

App.Controller = {};
App.Widgets = {};
App.State = {};


// Helper functions

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

// Base widget
//
// Does all the boring setup stuff that every widget must do to function.
// Changing this will affect any other widgets

App.Widgets.Base = function Widget ($host) {
  this.dom    = { main: $host };
  this.config = $host.data();
  this.type   = this.config.widget;

  log('New widget:', this.type);
  $host.data('instance', this);
};

// Begin concatting other files....