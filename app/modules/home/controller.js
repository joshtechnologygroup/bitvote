angular.module('rampup.home', ['ngMaterial', 'restangular'])
  .config(
    function ($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/login', {
          templateUrl: 'modules/home/views/login.html',
          controller: 'loginCtrl'
        })
        .when('/otp', {
          templateUrl: 'modules/home/views/otp.html',
          controller: 'loginCtrl'
        })
        .when('/track', {
          templateUrl: 'modules/home/views/track.html',
          controller: 'trackCtrl'
        })
        .when('/count', {
          templateUrl: 'modules/home/views/count.html',
          controller: 'countCtrl'
        })
        .otherwise({redirectTo: '/'})
    })
  .controller('loginCtrl', function ($scope, $location, homeService, localStorageService) {
    $scope.user = {};
    $scope.requestOtp = function () {
      var phoneNumber = $scope.user.phone.toString();
      localStorageService.set('phoneNumber', phoneNumber);
      var payload = {
        'phone_number': phoneNumber
      };
      homeService.requestOtp(payload).then(
        function (response) {
          console.log(response.otp_number);
          $location.url('/otp');
        },
        function (response) {
          $scope.errorMessage = response.data.message;
        }
      )
    };

    $scope.submitOtp = function () {
      var payload = {
        'phone_number': localStorageService.get('phoneNumber'),
        'otp_number': $scope.user.otp.toString()
      };
      homeService.submitOtp(payload).then(
        function (response) {
          localStorageService.set("name", response.name);
          localStorageService.set("isLoggedIn", true);
          localStorageService.set("keys", response.keys);
          $location.url('/profile');
        },
        function (response) {
          $scope.errorMessage = response.data.message;
        }
      )
    };
  })
  .controller('trackCtrl', function ($scope, $location, homeService, localStorageService) {
    $scope.track = function () {
      var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      console.log(web3.eth.getTransaction($scope.hash));
    };
  })
  .controller('countCtrl', function ($scope, $location, userService, localStorageService) {
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    $scope.res = [];
    userService.getEligibleCandidates().then(
      function (response) {
        $scope.candidates = response;
        var length = $scope.candidates.length;
        for (var i = 0; i < length; i++) {
          var public_address = $scope.candidates[i].public_address;
          $scope.res.push([$scope.candidates[i].name, web3.eth.getBalance(public_address)])
        }
      },
      function () {
      }
    );
  })
  .controller('headerCtrl', function ($scope, localStorageService) {
    $scope.isLoggedIn = localStorageService.get("isLoggedIn") === true;
  });
