'use strict';

var myApp = angular.module('myApp');

myApp.controller('default', function($scope, $http, $cookies, conv) {
    

    $scope.refresh = function() {
        var urlPlayers = conv.url("users");
        $scope.opponents = [];
        var session = $cookies.get(conv.cookieSessionKey);
        $scope.userLogin = session;
        $http.get(urlPlayers).then(function(response) {
            if (response.status == 200) {
                var users = response.data;
                for (var i = 0; i < users.length; i++) {
                    var user = users[i];
                    if (user.userLogin != $cookies.get(conv.cookieSessionKey)) {
                        $scope.opponents.push(user.userLogin);
                    }
                }
            }
        });
    
        var urlUserGames = conv.url("getUserGames?userLogin=" + $scope.userLogin);
        $http.get(urlUserGames).then(function(response) {
            if (response.status == 200) {
                var games = response.data;
                $scope.myGames = games;
            }
        });

        var urlLeaderboards = conv.url("getLeaderboards");
        $http.get(urlLeaderboards).then(function(response) {
            if (response.status == 200) {
                var pplLB = response.data;
                $scope.pplLB = pplLB;
            }
        });
    }
    $scope.refresh();



    $scope.addGame = function() {
        if (conv.isNull($scope.selectedName) || conv.isNull($cookies.get(conv.cookieSessionKey)) || conv.isNull($scope.oppScore) || conv.isNull($scope.yourScore)) {
            alert("Please input all fields");
            return;
        }

        // $scope.selectedName $cookies.get(conv.cookieSessionKey) $scope.oppScore $scope.yourScore
        var winnerScore, loserScore, winner, loser;
        
        if ($scope.oppScore >= $scope.yourScore) {
            winnerScore = $scope.oppScore;
            loserScore = $scope.yourScore;
            winner = $scope.selectedName;
            loser = $cookies.get(conv.cookieSessionKey);
        } else {
            winnerScore = $scope.yourScore;
            loserScore = $scope.oppScore;
            winner = $cookies.get(conv.cookieSessionKey);
            loser = $scope.selectedName;
        }

        var url = conv.url("saveGame?winner="+winner+"&loser="+loser+"&winnerScore="+winnerScore+"&loserScore="+loserScore);

        $http.get(url).then(function(response) {
            if (response.status == 200) {
                $scope.refresh();
            } else {
            }
        });
    } 

});