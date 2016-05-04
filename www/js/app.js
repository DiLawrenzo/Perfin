// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic-material', 'ionMdInput', 'starter.controllers', 'starter.services','starter.constant'])

.run(function($ionicPlatform, $rootScope, $state, SessionService, AUTH_EVENTS) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.expense', {
        url: '/expense',
        views: {
            'menuContent': {
                templateUrl: 'templates/expense.html',
                controller: 'ExpenseCtrl'
            },
            'fabContent': {
                template: '<button id="fab-expense" class="button button-fab button-fab-top-right expanded button-energized-900 flap" ui-sref="app.gallery"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-expense').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.income', {
        url: '/income',
        views: {
            'menuContent': {
                templateUrl: 'templates/income.html',
                controller: 'IncomeCtrl'
            },
            'fabContent': {
                template: '<button id="fab-income" class="button button-fab button-fab-top-right expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-income').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('app.account', {
        url: '/account',
        views: {
            'menuContent': {
                templateUrl: 'templates/account.html',
                controller: 'AccountCtrl'
            },
            'fabContent': {
                template: '<button id="fab-account" class="button button-fab button-fab-top-right expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-account').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('app.saving', {
        url: '/savings',
        views: {
            'menuContent': {
                templateUrl: 'templates/saving.html',
                controller: 'SavingCtrl'
            },
            'fabContent': {
                template: '<button id="fab-account" class="button button-fab button-fab-top-right expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-account').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('app.gallery', {
        url: '/gallery',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            },
            'fabContent': {
                template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.signup', {
      url: '/signup',
      views: {
            'menuContent': {
                templateUrl: 'templates/signup.html',
                controller: 'SignCtrl'
            },
            'fabContent': {
                template: ''
            }
        }

  })

    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                // template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900" ng-click="add()"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);
                }
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');


})

;
