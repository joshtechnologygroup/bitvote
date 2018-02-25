'use strict';

angular.module('rampup.home')
  .service('homeService', function (Restangular) {

    this.requestOtp = function (payload) {
      return Restangular.all("/polls/generate-otp/").post(payload);
    };

    this.submitOtp = function (payload) {
      return Restangular.all("/polls/submit-otp/").post(payload);
    };

  });
