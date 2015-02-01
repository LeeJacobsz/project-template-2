
//
// Init.js
//
// This is entry point to the whole program. Nothing should have executed before we get here.
//

// Dom ready
$(function () {

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

	// Global page controller

	// ....

});


// Now close the global scope protection so that there is no longer a syntax error!
}());