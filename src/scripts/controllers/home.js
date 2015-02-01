
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