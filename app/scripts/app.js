'use strict';

angular
  .module('todomvc', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/todomvc-index.html',
        controller: 'TodoCtrl as todo',
      });
  }]);
