angular.module('rampup.other', ['ngMaterial'])
  .config(
    function ($locationProvider, $routeProvider) {
      $routeProvider
        .when('/faq', {
          templateUrl: 'modules/other/views/faq.html',
          controller: 'faqCtrl'
        })
        .when('/contact', {
          templateUrl: 'modules/other/views/contact.html'
        })
        .when('/privacyPolicy', {
          templateUrl: 'modules/other/views/privacyPolicy.html'
        })
        .when('/about', {
          templateUrl: 'modules/other/views/about.html'
        })
        .when('/feature', {
          templateUrl: 'modules/other/views/requestFeature.html'
        })
        .when('/feedback', {
          templateUrl: 'modules/other/views/feedback.html'
        })
        .when('/subscribe', {
          templateUrl: 'modules/other/views/subscribe.html'
        })
        .otherwise({redirectTo: '/'})
    })
  .controller('faqCtrl', function ($scope, $mdDialog) {
    $scope.queAns = [{
      que: 'I am the first question. Do you wanna know about what bitvote is?',
      ans: 'Answer1 The product key is located inside the product packaging, on the receipt or confirmation page for a digital purchase or in a confirmation e-mail that shows you purchased Windows. If you purchased a digital copy from Microsoft Store, you can locate your product key in your Account under Digital Content.'
    }, {que: 'Question2', ans: 'Answer2'},
      {que: 'Question3', ans: 'Answer3'}, {que: 'Question4', ans: 'Answer4'}];
    $scope.showAnswer = false;

    $scope.submitQuery = function (ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Thank You')
          .textContent('Your query has been recorded. We will revert to you as soon as possible.')
          .ok('Got it!')
          .targetEvent(ev)
      );
      $scope.query = {}
    };
  })
  .controller('featureCtrl', function ($scope) {
    $scope.submitFeature = function () {

    };
  })
  .controller('feedbackCtrl', function ($scope) {
    $scope.submitFeedback = function () {

    };
  })
  .controller('subscribeCtrl', function ($scope) {
    $scope.email = null;
    $scope.subscribed = false;
    $scope.subscribe = function () {
      $scope.subscribed = true;
    };
  });
