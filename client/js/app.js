var app = angular.module('app', ['lbServices','ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider,$httpProvider) {
    
    app.ayso= {};

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })      
      .state('player',{
        url: '/player',
        templateUrl: 'views/player.html',
        controller: 'PlayerCtrl'
      })
      .state('register',{
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      });
    $urlRouterProvider.otherwise('login');

    $httpProvider.interceptors.push(function($q, $location) {
      return {
       responseError: function(rejection) {
         if (rejection.status == 401) {
          $location.nextAfterLogin = $location.path();
          $location.path('/login');
        }
      return $q.reject(rejection);
    }
  };
});
}]);

app.controller('LoginCtrl', function($scope, Player, $location) {
  $scope.login = function() {
    console.log('login method called');
    $scope.loginResult = Player.login($scope.credentials,
      function(data) {
         app.ayso.player = data.user;
      }, function(res) {
        console.log('log in error:' + res);
      });
  };
});

app.controller('PlayerCtrl', function($scope, Player) {
  $scope.createPlayer = function() {
    var result = Player.create($scope.Player, function(data) {
      $location.path('/registration');
    }, function(err) {
      console.log('error creating player: ' + err);
    });
  };
});

app.controller('RegisterCtrl', function($scope, Player, Registration) {
  $scope.registerForSeason = function() {

    Player.cklm

    var result = Player.create($scope.Player, function(data) {
      $location.path('/registration');
    }, function(err) {
      console.log('error creating player: ' + err);
    });
  };
});