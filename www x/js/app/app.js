// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ui-router']);


app.config(function($stateProvider) {

  $stateProvider

  .state('landing', {
      url: '/landing',
      templateUrl: 'landing.html',
      controller: 'landCtrl'
  })

  .state('login', {
      url: '/login',
      templateUrl: 'account.html',
      controller: 'loginCtrl'
  })

  .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'homeCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/');

});
