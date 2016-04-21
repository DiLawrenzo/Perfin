// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services' ,'starter.constant' ])

.run(function($ionicPlatform) {
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

.config(function($stateProvider, $urlRouterProvider , USER_ROLES) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('app', {
      url: '/',
      templateUrl: 'templates/landing.html',
      controller: 'AppCtrl'
  })

  .state('landing', {
      url: '/',
      templateUrl: 'templates/landing.html',
      controller: 'LandCtrl'
  })

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

  .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignCtrl'
  })

  .state('datepicker', {
      url: '/datepicker',
      views: {
        'menuContent' :{
          templateUrl: 'templates/datepicker.html',
          controller: 'DatepickerCtrl'
        }
      }
  })
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    },
    data: {
      authorisedRoles: [USER_ROLES.public] 
    }
  })

  .state('tab.bdash', {
    url: '/bdash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-business.html',
        controller: 'BDashCtrl'
      }
    },
    data: {
      authorisedRoles: [USER_ROLES.business] 
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:expenseId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:incomeId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
    })
    .state('tab.view-detail', {
      url: '/account/:viewId',
      views: {
        'tab-account': {
          templateUrl: 'templates/view-detail.html',
          controller: 'ViewDetailCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

})

.run(function($rootScope) {
  $rootScope.dat = new Date();
})
/*
.run(function($rootScope, $state, SessionService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function(event, next, nextParams, fromState) {

    if ('data' in next && 'authorisedRoles' in next.data) {
      var authorisedRoles = next.data.authorisedRoles;
      if (!SessionService.isAuthorised(authorisedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
         $rootScope.$broadcast(AUTH_EVENTS.notAuthorised);
      }
    }
    
    if (!SessionService.isAuthenticated()) {
      if (next.name !== 'login') {
        event.preventDefault(); 
        $state.go('login');
      }
    } 
  });
})
/*
.run(function($httpBackend) {
  $httpBackend.whenGet('http://localhost:8100/valid').respond{message: 'valid response'};
  $httpBackend.whenGet('http://localhost:8100/notauthenticated').respond{message: 'Not Authenticated'};
  $httpBackend.whenGet('http://localhost:8100/notauthorised').respond{message: 'Not Authorised'};
  $httpBackend.whenGET(/templates\/\+."/).passThrough();
})
*/
;
