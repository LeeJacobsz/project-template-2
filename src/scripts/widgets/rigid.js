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