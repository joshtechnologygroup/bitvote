'use strict';

// Declare app level module which depends on views, and components
var rampup = angular.module('rampup', [
  'ngMaterial',
  'ngRoute',
  'ngMessages',
  'ngAnimate',
  'ngSanitize',
  'restangular',
  'LocalStorageModule',
  '720kb.socialshare',
  'rampup.home',
  'rampup.user',
  'rampup.other'
]).config(function ($locationProvider, $routeProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
    .when('/', {
      templateUrl: 'modules/home/views/home.html'
    })
    .when('/error404', {
      templateUrl: 'modules/other/views/error404.html'
    })
    .otherwise({redirectTo: '/'});

  $mdThemingProvider.definePalette('customTheme', {
    '50': '536082',
    '100': '44547c',
    '200': '30384d',
    '300': '293042',
    '400': '222837',
    '500': '1b2a45',
    '600': '18253e',
    '700': '152137',
    '800': '121d30',
    '900': '101929',
    'A100': '5d86ff',
    'A200': '2A60FF',
    'A400': '003EF6',
    'A700': '0037DD',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast) on this palette should be dark or light
    'contrastDarkColors': undefined,
    'contrastLightColors': ['100', '200', //hues which contrast should be 'dark' by default
      '300', '400', 'A100', 'A200']    // could also specify this if default was 'dark'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('yellow')
    .warnPalette('red').dark();
}).config(function (RestangularProvider) {
  RestangularProvider.setBaseUrl('http://192.168.0.204:8000');
}).config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('bitVote');
});

