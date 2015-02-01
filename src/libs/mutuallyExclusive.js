// $.mutuallyExclusive
$.fn.mutuallyExclusive = function (cname) {
  var $all = this, cname = cname || 'active';

  return this.click(function () {
    $all.removeClass(cname);
    $(this).addClass(cname);
  });
};