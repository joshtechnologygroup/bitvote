'use strict';

angular.module('rampup.user')
  .service('userService', function (Restangular) {

    this.submitPublicAddress = function (payload) {
      return Restangular.all("/polls/update/registration/details/").post(payload);
    };

    this.getEligibleCandidates = function () {
      return Restangular.all("/polls/candidates").getList();
    };

    this.getVoters = function () {
      return Restangular.all("/polls/voters").getList();
    }
  });
