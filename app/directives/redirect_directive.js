(function () {
  var ngRedirectTo = function ngRedirectTo($window) {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {
        element.bind('click', function () {
          $window.location.href = attributes.ngRedirectTo;
        });
      }
    };
  };
  angular.module('rampup').directive('ngRedirectTo', ngRedirectTo);
}());
