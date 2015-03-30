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

// 'home' Page Controller
//
// This file already expects 'App' to exist, and to contain an object called 'Controllers'

App.Controllers.home = function ($page, $$) {

	log('Page controller "home" is running!');

	// Initialise the slider on the homepage
	$$('[data-widget="slider"]').each(function () {
		var $widgetRegion = $(this);
		var widgetConfig = $(this).data();
		App.Widgets.slider($widgetRegion, widgetConfig);
	});
};
// Full-height widget
//
// Will measure the size of the page and set it's height, minus an optional
// offset you can give it.

App.Widgets.fullHeight = function FullHeight ($host) {

  // Use Base Widget for boilerplate
  App.Widgets.Base.apply(this, arguments);

  // Set offset to zero if not explicitly set by data-offset attribute
  var offset = this.config.offset || 0;

  // Listen to events we care about
  $(window).on('resize', function () {
    $host.height(window.innerHeight - offset);
  });
};

// Blank Widget
// Copy to make new widget files
//
// This file already expects 'App' to exist, and to contain an object called 'Widgets'

App.Widgets['widget-name'] = function ($host, config) {

	// Extend the base widget
	App.Widgets.Base.apply(this, arguments);

	// Options

	// State

	// Helper functions

	// Callbacks

	// Init
	// - bind listeners
	// - create special DOM, etc

};
// Rigid Aspect
//
// Makes an element exhibit an inherent ratio, which responsively scales
// with page size, like an image with { display: block; width: 100%; }

App.Widgets.rigid = function Rigid ($host) {

  // Base
  App.Widgets.Base.apply(this, arguments);

  // Options
  var ratio = this.config.ratio || 1;

  // We enforce the width naturally and performantly, by inserting an element
  // which behaves like an image but which has the exact size we tell it to.
  // In standards-compliant browsers the canvas element has this behaviour.
  // However in IE<11 it will not scale rigidly like an image. Therefore we
  // must use a real img element, but whose content is a data-uri captured
  // from a canvas with the correct dimensions.

  // Create canvas with dimensions conforming to our desired aspect ratio
  var canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = (ratio * 100);

  // Capture contents of the canvas as a data uri, push it to an image
  var img = new Image;
  img.src = canvas.toDataURL();

  // Capture this with jQuery so we can manipulate it
  var $secret = $(img);

  // With the appropriate styles, this will prop the parent container open
  // with the correct ratio, event when it's other children are pos:abs
  $secret.css({
    display: 'block',
    width: '100%',
    height: 'auto',
    visibility: 'hidden',
    position: 'relative',
    zIndex: -1
  }).appendTo($host);
};

// 'slider' Widget
//
// This file already expects 'App' to exist, and to contain an object called 'Widgets'

App.Widgets.slider = function ($host, config) {

  log('Slider widget initialised!');

  $host.text('I am now a slider!');

};


//
// Init.js
//
// This is entry point to the whole program. Nothing should have executed before we get here.
//

// Dom ready
$(function () {

	// Initialise all widget we can find
	$('[data-widget]').each(function () {
		var type = $(this).data('widget');
		var $host = $(this);

		if (App.Widgets[type]) {
			new App.Widgets[type]($host, $host.data());
		} else {
			console.error('Widget', type, 'unknown!');
		}
	});

	// Dispatch page controller (if it exists)
	$('[data-page-controller]').each(function () {
		var ctrlName = $(this).data('page-controller');

		if (App.Controllers[ctrlName]) {
			var $myPageRegion = $(this);
			App.Controllers[ctrlName]($myPageRegion, function (sel) {
				return $(sel, $myPageRegion);
			});
		} else {
			console.error('Page controller', ctrlName, 'requested but not found!');
		}
	});

});


// Now close the global scope protection so that there is no longer a syntax error!
}());