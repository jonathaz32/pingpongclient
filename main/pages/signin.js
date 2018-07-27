'use strict';

var myApp = angular.module('myApp');

myApp.controller('signin', function($scope, $window, $cookies, $http, conv) {

    $scope.login = function() {
        var url = conv.url("users");
        $http.get(url).then(function(response) {
            if (response.status == 200) {
                var users = response.data;
                for (var i = 0; i < users.length; i++) {
                    var user = users[i];
                    if (user.userLogin == $scope.userLogin) {
                        //$rootScope.userLogin = $scope.userLogin;
                        $cookies.put(conv.cookieSessionKey, $scope.userLogin);
                        $window.location.href = "/#!/home";
                    }
                }
            }
        });
    }

    $scope.register = function() {
        if ($scope.userSignup == null || $scope.userSignup == "" || typeof $scope.userSignup == 'undefined') {
            alert("Undefined Name for Registration");
            return;
        }

        var pathAndArgs = "user?userLogin="+$scope.userSignup;
        var url = conv.url(pathAndArgs);
        $http.get(url).then(function(response) {
            if (response.status == 200) {
                var user = response.data;
                if (user == "" || user == null || user == 'undefined') {
                    // user does not exist, create it
                    var pAndArgs2 = "save?userLogin="+$scope.userSignup;
                    var url2 = conv.url(pAndArgs2);
                    $http.get(url2).then(function(response2) {
                        if (response2.status == 200) {
                            alert("Successful Registration!");
                        }
                    });
                    
                } else {
                    alert("User already exists!");
                }
            }
        });
    }

    
});