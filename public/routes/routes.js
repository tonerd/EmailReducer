App.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/',
      {
        controller: 'EmailController',
        templateUrl: 'templates/email.html'
      }
    )
    .otherwise( { redirectTo: '/' } );
}]);
