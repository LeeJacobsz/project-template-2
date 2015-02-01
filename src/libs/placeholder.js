// Input Placeholder for IE
//
// use along with modernizer
// input elements in html used in same way as if browser supported placeholder text

jQuery(function () {
  // check placeholder browser support
  if (!Modernizr.input.placeholder) {
    // set placeholder values
    jQuery(this).find('[placeholder]').each(function () {
      if (jQuery(this).val() == '') {
        jQuery(this).val(jQuery(this).attr('placeholder'));
        jQuery(this).addClass('placeholder');
      }
    });
    // focus and blur of placeholders
    jQuery('[placeholder]').focus(function () {
      if (jQuery(this).val() == jQuery(this).attr('placeholder')) {
        jQuery(this).val('');
        jQuery(this).removeClass('placeholder');
      }
    }).blur(function () {
      if (jQuery(this).val() == '' || jQuery(this).val() == jQuery(this).attr('placeholder')) {
        jQuery(this).val(jQuery(this).attr('placeholder'));
        jQuery(this).addClass('placeholder');
      }
    });
    // remove placeholders on submit
    jQuery('[placeholder]').closest('form').submit(function () {
      jQuery(this).find('[placeholder]').each(function () {
        if (jQuery(this).val() == jQuery(this).attr('placeholder')) {
          jQuery(this).val('');
        }
      });
    });
  }
});