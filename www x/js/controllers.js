angular.module('starter.controllers', ['pickadate'])


.controller('AppCtrl', function($state, $scope, $rootScope, $ionicPopup, SessionService, AUTH_EVENTS) {
    $scope.usertype = SessionService.usertype();

    $scope.$on(AUTH_EVENTS.notAuthorised, function(event) {
      var alertPopup = $ionicPopup.alert({
        title: 'Unauthorized!',
        template: 'You are not allowed to access this page!'
      });
    });
    
    $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
      SessionService.logout();
      $state.go('login');
      var alertPopup = $ionicPopup.alert({
        title: 'Session Error!',
        template: 'You have to login again!'
      });
    });

    $scope.setUsertype = function(type) {
      var type = 'individual';
      $scope.usertype = type;
    }
})

.controller('SignCtrl', function($scope , SignupService, $ionicPopup, $state) {
    $scope.signdata = {};

    $scope.signup = function() {
        SignupService.signupUser($scope.signdata.username, $scope.signdata.email, $scope.signdata.password, $scope.signdata.type)
        .success(function(signdata) {

            $state.go('tab.dash');

        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Signup failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
    $scope.type = "individual";

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password, $scope.type)
        .success(function(data) {
          //.success(function(authenticated) {

             $state.go('tab.dash');
             //console.log('true');
            //$state.go('tab.dash', {}, {reload: true});
            //$scope.setUsertype($scope.type);
        }).error(function(data) {          
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            }); 
        });
    }
})

.controller('LandCtrl', function($scope,$timeout) {
  $timeout(function() {
        //$scope.$parent.hideHeader();
    }, 0);
})

.controller('LogoutCtrl', function($scope) {
   $scope.logout = function() {
    SessionService.logout();
    $state.go('login');
   }
})

.controller('DashCtrl', function($scope, $state, $ionicPopup, SavingService,ExpenseService, IncomeService, SessionService) {
  
  $scope.logout = function() {
    SessionService.logout();
    $state.go('login');
   };

  IncomeService.getTotal().then(function(data) {
      
      var total = 0; 
      $scope.incomes = data;
      for (var i = 0; i < $scope.incomes.length; i++) {     
      total += parseInt($scope.incomes[i].amount); 
          
        } ;
      IncomeService.getToday().then(function(data) {
      
      var total = 0; 
      itotal = data;  
      //console.log(total);       
     
      });
      $scope.itotals = function() { return total;}
       $scope.itoday = function() { return itotal;}
    });

  ExpenseService.getTotal().then(function(data) {
      
      var total = 0; 
      $scope.expenses = data; 
      for (var i = 0; i < $scope.expenses.length; i++) {   
      total += parseInt($scope.expenses[i].amount); 
          
       };
      ExpenseService.getTotal().then(function(data) {
        var date = new Date();
        
        for (var i = 0; i < data.length; i++) {   
          if (data[i].date == date){
            etotal += parseInt(data[i].amount); 
            
            };
          };
      }); 

      $scope.etotals = function() { return total;}
      $scope.etoday = function() { return etotal;}

      
      
          
    });

  SavingService.getTotal().then(function(data) {
      
      var total = 0; 
      $scope.expenses = data;
      for (var i = 0; i < $scope.expenses.length; i++) {   
      total += parseInt($scope.expenses[i].amount); 
          
        }
        
      $scope.stotals = function() { return total;}      
    });


  
  $scope.today = function() { 
      var total = 0; 
      //var inc = $scope.itotals();
      //var exp = $scope.etotals();
      return $scope.etoday();
    };

  $scope.totals = function() {
      var total = 0; 
      var inc = $scope.itotals();
      var exp = $scope.etotals();
      total = inc - exp;
      
      return total;
      
    };
})

.controller('BDashCtrl', function($scope,  $state, $ionicPopup,  SessionService) {
 
})

.controller('DatepickerCtrl', function($scope, $rootScope, $ionicModal, DateService) {    
    $ionicModal.fromTemplateUrl('templates/datemodal.html', 
        function(modal) {
            $scope.datemodal = modal;
        },
        {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope, 
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
        }
    );
    $scope.opendateModal = function() {
      $scope.datemodal.show();
    };
    $scope.closedateModal = function(modal) {
      $scope.datemodal.hide();
      $scope.datepicker = modal;
      $scope.date = $scope.datepicker; 
      $rootScope.$broadcast('date', $scope.date);
      DateService.retDate($scope.date);
    }; 
})

.controller('ChatsCtrl', function($scope, DateService, ExpenseService, $state, $ionicPopup, SessionService) {
  $scope.data = {};   
  $scope.expenses = {};
  //$scope.totals = {};
  ExpenseService.getExpense() 
    .then(function(data) {
      $scope.expenses = data;
      $scope.all = function() {
        return $scope.expenses;
      };

      $scope.remove = function(expense) {
        expenses.splice(expenses.indexOf(expense), 1);
      };      
    }); 
  
  ExpenseService.getTotal().then(function(data) {
      
      var total = 0; 
      $scope.expenses = data;  
      for (var i = 0; i < $scope.expenses.length; i++) {     
      total += parseInt($scope.expenses[i].amount); 
          
        }
        
      //$scope.totals = function() { return total;}
    });

  ExpenseService.getToday().then(function(data) {
      
      var total = 0; 
      total = data;  
       console.log(total);       
      $scope.totals = function() { return total;}
    });  

  $scope.submit = function() {    
  $scope.date = DateService.getDate();

  ExpenseService.addExpense($scope.data.amount, $scope.date, $scope.data.title, $scope.data.account, $scope.data.notes) 
      .success(function(data) {
        console.log('Response receieved');  

      })
      .error(function(data) { 
        console.log('Adding Expense Failed');
      });
  };
  $scope.logout = function() {
    SessionService.logout();
    $state.go('login');
   }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, ExpenseService) {
  $scope.expense = ExpenseService.get($stateParams.expenseId);
})

.controller('FriendsCtrl', function($scope, $rootScope, DateService, IncomeService, $state, $ionicPopup, SessionService) {
 
  $scope.data = {};   
    
  IncomeService.getIncome() 
    .then(function(data) {
      console.log('Response receieved');
      $scope.incomes = data;
            
      $scope.all = function() {
      return incomes;
      };
      $scope.remove = function(income) {
        incomes.splice(incomes.indexOf(income), 1);
      };      
      
      
    }); 
    
    var total = 0;
    IncomeService.getTotal().then(function(data) {      
       
      $scope.expenses = data;
      for (var i = 0; i < $scope.expenses.length; i++) {   
      total += parseInt($scope.expenses[i].amount); 
          
        }
        
      //$scope.totals = function() { return total;}
       
    });

    IncomeService.getToday().then(function(data) {
      
      var total = 0; 
      total = data;  
       console.log(total);       
      $scope.totals = function() { return total;}
    });

    $scope.submit = function() {    
    $scope.date = DateService.getDate();
    $scope.incomes = [];
    IncomeService.addIncome($scope.data.amount, $scope.date, $scope.data.title, $scope.data.account, $scope.data.notes) 
      .success(function(data) {
        console.log('Response receieved');  

      })
      .error(function(data) { 
        console.log('Adding Income Failed');
      });
  };


  $scope.logout = function() {
    SessionService.logout();
    $state.go('login');
   }
})

.controller('FriendDetailCtrl', function($scope, $stateParams, IncomeService) {
  $scope.income = IncomeService.get($stateParams.incomeId);
})

.controller('ViewDetailCtrl', function($scope, $stateParams, Views) {
  $scope.view = Views.get($stateParams.viewId);
})

.controller('AccountCtrl', function($scope, Views, $state, $ionicPopup, SessionService) {
  $scope.settings = {
    enableViews: true
  };
  $scope.logout = function() {
    SessionService.logout();
    $state.go('login');
   }
  $scope.views = Views.all();
});
