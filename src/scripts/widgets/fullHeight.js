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