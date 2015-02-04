var app = angular.module('app', ['lbServices','ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider,$httpProvider) { 
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html'
      })  
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
      })
      .state('done',{
        url: '/done',
        templateUrl: 'views/done.html'
      });
    $urlRouterProvider.otherwise('/home');

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

app.controller('LoginCtrl', function($scope, Player, $location, appState) {
  $scope.login = function() {
    console.log('login method called');
    $scope.loginResult = Player.login($scope.credentials,
      function(data) {
         appState.currentPlayer = data.user;
         $location.path('/register');
      }, function(res) {
        console.log('log in error:' + res);
      });
  };
});

app.controller('PlayerCtrl', function($scope, Player, appState) {
  $scope.createPlayer = function() {
    var result = Player.create($scope.Player, function(data) {
      appState.currentPlayer = data.user;
      $location.path('/register');
    }, function(err) {
      console.log('error creating player: ' + err);
    });
  };
});

app.controller('RegisterCtrl', function($scope, Player, appState) {
  $scope.registerForSeason = function() {
    Player.Registrations.create({ id: appState.currentPlayer.id }, $scope.Registration, function(data) {
       $location.path('/done');
    }, function(err) {
       console.log(err);
    });
  };
});

app.factory('appState', function() {
    return {};
});

