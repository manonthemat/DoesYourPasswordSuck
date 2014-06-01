'use strict';

angular.module('dypws.controllers', [])
    .controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
        var yousuck_audio = new Audio('sound/yousuck.mp3');
        
        
        $scope.suckiness = null;
        
        var checkPattern = function(inp, letters_only) {
            if (letters_only) {
                var exp = /^[a-z]+$/;
            }
            else {
                var exp = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
            }
            if (inp.match(exp)) {
                return true;
            }
            else {
                return false;
            }
        }

        $scope.checkSuckiness = function() {
            if (($scope.password == null) || ($scope.password == "")) {
                // empty password => moron!
                $scope.suckiness = 100;
            }
            else if ($scope.password.length == 1) {
                // 1 character => seriously?!
                $scope.suckiness = 99;
            }
            else if ($scope.password.length < 8) {
                // under 8 characters => pretty darn dumb
                $scope.suckiness = 90;
            }
            else if (isNaN($scope.password) == false) {
                // it's a number => 80
                $scope.suckiness = 80;
            }
            else if (checkPattern($scope.password, true)) {
                // only letters
                $scope.suckiness = 70;
            }
            else if (checkPattern($scope.password, false)) {
                // alphanumeric
                $scope.suckiness = 60;
            }
            
            else {
                // check for cracked pw
                $scope.check_cracked_pws = true;
                $http.get('http://localhost:5000/secret/'+$scope.password).success(function(data){
                    if (data == "50") {
                        $scope.suckiness = 50;
                    }
                    else if (data == "66") {
                        $scope.suckiness = 66;
                    }
                    else {
                        // if not cracked => it ain't that bad
                        $scope.suckiness = 1;
                    }
                }).error(function(data) {
                    console.log("that didn't work");
                });
                
            }
            
            if ($scope.suckiness > 1) {
                yousuck_audio.play();
            }
        }
  }])
;