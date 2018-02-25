angular.module('rampup.user', ['ngMaterial'])
  .config(
    function ($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/profile', {
          templateUrl: 'modules/user/views/personal.html',
          controller: 'userCtrl'
        })
        .when('/generateKeys', {
          templateUrl: 'modules/user/views/generateKeys.html',
          controller: 'generateKeysCtrl'
        })
        .when('/resetKeys', {
          templateUrl: 'modules/user/views/resetKeys.html',
          controller: 'resetKeysCtrl'
        });
    })

  .controller('userCtrl', function ($scope, localStorageService, $location, userService, $mdDialog) {

    $scope.name = localStorageService.get("name");
    $scope.hasKeys = localStorageService.get("keys");
    $scope.voteCasted = localStorageService.get("voteCasted");
    $scope.activeUserPanel = "profile";

    $scope.changeActivePanel = function (panelName) {
      $scope.activeUserPanel = panelName;
      if (panelName === 'reset') {
        var mdDialog = $mdDialog
          .show(
            $mdDialog.confirm()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Confirmation')
              .textContent('Are you sure you want to reset your keys?')
              .ok('Yes')
              .cancel('No')
          );

        $mdDialog.show(mdDialog).then(function () {
          var publicKey = '';
          var privateKey = '';
          var publicAddress = '';
          userService.resetKeys(publicAddress);
        }, function () {
        });
      }
    };

    $scope.getActivePanel = function () {
      var activePanel;
      switch ($scope.activeUserPanel) {
        case 'profile':
          activePanel = 'modules/user/views/profile.html';
          break;
        case 'castVote':
          activePanel = 'modules/user/views/castVote.html';
          break;
        case 'generateKeys':
          activePanel = 'modules/user/views/generateKeys.html';
          break;
        case 'resetKeys':
          activePanel = 'modules/user/views/resetKeys.html';
          break;
        case 'distributeVotes':
          activePanel = 'modules/user/views/distributeVotes.html';
          break;
        default:
          activePanel = 'modules/user/views/profile.html';
      }
      return activePanel;
    };

    $scope.logout = function () {
      localStorageService.set("isLoggedIn", false);
      localStorageService.remove("name");
      localStorageService.remove("keys");
      $location.url('/');
    };
  })
  .controller('resetKeysCtrl', function ($scope, userService, $location, localStorageService) {
    $scope.submit = function () {
      var payload = {
        'public_address': $scope.publicAddress,
        'phone_number': localStorageService.get('phoneNumber')
      };
      userService.submitPublicAddress(payload).then(
        function () {
          $scope.generated = true;
          $location.url('/profile');
        },
        function () {
          $location.url('/error404');
        }
      );
    }
  })
  .controller('generateKeysCtrl', function ($scope, userService, $location, localStorageService) {
    $scope.submit = function () {
      var payload = {
        'public_address': $scope.publicAddress,
        'phone_number': localStorageService.get('phoneNumber')
      };
      userService.submitPublicAddress(payload).then(
        function () {
          $scope.generated = true;
          localStorageService.set("keys", true);
          $scope.hasKeys = true;
          $location.url('/profile');
        },
        function () {
          $location.url('/error404');
        }
      );
    }
  })
  .controller('castVoteCtrl', function ($scope, userService, $location, localStorageService) {
    $scope.voteCasted = false;
    userService.getEligibleCandidates().then(
      function (response) {
        $scope.candidates = response;
      },
      function () {
      }
    );

    $scope.castVote = function () {
      var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      var transaction = new ethereumjs.Tx({
        from: $scope.voterPublicAddress,
        to: $scope.selectedCandidate.public_address,
        value: '0xDE0B6B3A7640000',
        gasLimit: '0x186A0',
        gasPrice: '0x0',
        nonce: 10
      });
      var privateKey = ethereumjs.Buffer.Buffer($scope.voterPrivateKey, "hex");
      transaction.sign(privateKey);
      var rawTransaction = "0x" + transaction.serialize().toString('hex');
      $scope.transactionHash = web3.eth.sendRawTransaction(rawTransaction);
      console.log($scope.transactionHash);
      $scope.voteCasted = true;
    };
  })
  .controller('distVoteCtrl', function ($scope, userService) {
    $scope.distributeVote = function () {
      $scope.distributed = false;
      var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      web3.personal.unlockAccount(web3.eth.coinbase, $scope.passphrase, 3600);

      userService.getVoters().then(
        function (response) {
          console.log(response);
          var totalVoters = response.length;
          for (var i = 0; i < totalVoters; i++) {
            var publicAddress = response[i].public_address;
            web3.eth.sendTransaction({
              from: web3.eth.coinbase,
              to: publicAddress,
              value: '0xDE0B6B3A76586A0'
            });
          }
          $scope.distributed = true;
        },
        function () {

        }
      )
    }
  });
