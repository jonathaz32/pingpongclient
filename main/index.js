'use strict';

var myApp = angular.module("myApp", ['ngRoute', 'ngCookies']);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'main/pages/signin.html',
        controller: 'signin'
    })
    .when('/home', {
        templateUrl: 'main/pages/default.html',
        controller: 'default'
    })
    .otherwise({
         redirectTo : '/'
    });
}]);