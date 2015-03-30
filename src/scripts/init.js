
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