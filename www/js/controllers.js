/* global angular, document, window */
'use strict';

angular.module('starter.controllers', ['pickadate'])

.controller('AppCtrl', function($scope, $state,  $ionicModal, $ionicPopover, $ionicPopup, $timeout, SessionService, AUTH_EVENTS) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }};

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();};

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

    //$scope.usertype = SessionService.loadUserSession();

    // $scope.$on(AUTH_EVENTS.notAuthorised, function(event) {
    //   var alertPopup = $ionicPopup.alert({
    //     title: 'Unauthorized!',
    //     template: 'You are not allowed to access this page!'
    //   });
    // });
    
    // $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    //   SessionService.logout();      
    //   var alertPopup = $ionicPopup.alert({
    //     title: 'Session Error!',
    //     template: 'You have to login again!'
    //   });
    //   $state.go('app.login');
    // });

    // $scope.setUsertype = function(type) {
    //   //var type = type;
    //   $scope.usertype = type;
    // };
    // $scope.logout = function() {
    //     var alertPopup = $ionicPopup.alert({
    //       title: 'Logged Out',
    //       template: 'You have been logged out'
    //     }); 
    //     $state.go('app.login')
    // };
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

.controller('LoginCtrl', function($scope, $timeout, $ionicPopup, LoginService, $state, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    //ionicMaterialInk.displayEffect();

    $scope.data = {};
    //$scope.type = "individual";
    
    $scope.login = function() {
      //console.log($scope.data.username);
      if (!$scope.data.password ){
      var alertPopup = $ionicPopup.alert({
                title: 'Fields Empty!',
                template: 'Please fill in all your details!'
            }); 
    } else {
        LoginService.loginUser($scope.data.username, $scope.data.password)
        .success(function(data) {          
          //console.log(data % 1);
          if (data % 1 === 0 ) {
            //console.log(data);
            var alertPopup = $ionicPopup.alert({
                title: 'Login success!',
                template: 'Welcome to Perfin!'
            });  
            $state.go('app.profile');
          } else {
              var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            }); 
          }  
        }).error(function(data) {          
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your connection!'
            }); 
        });
      }
    }
})

.controller('SignCtrl', function($scope , $timeout, $ionicPopup, SignupService, $state, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    //ionicMaterialInk.displayEffect();

    $scope.signdata = {};

    $scope.signup = function() {
    if (!$scope.signdata.password ){
      var alertPopup = $ionicPopup.alert({
                title: 'Fields Empty!',
                template: 'Please fill in all your details!'
            }); 
    } else {
        SignupService.signupUser($scope.signdata.username, $scope.signdata.email, $scope.signdata.password, $scope.signdata.type)
        .success(function(data) {
          //$state.go('app.profile');
          console.log(data );
          if (data % 1 === 0 ) {
            console.log(data);
            var alertPopup = $ionicPopup.alert({
                title: 'Signup success!',
                template: 'Welcome to Perfin!'
            });  
            $state.go('app.profile');
          } else {
              var alertPopup = $ionicPopup.alert({
                title: 'Signup failed!',
                template: 'Please check your credentials!'
            }); 
          }  
        }).error(function(data) {          
            var alertPopup = $ionicPopup.alert({
                title: 'Signup failed!',
                template: 'Please check your connection! -'+data
            }); 
        });
    }
    } 
})

.controller('FriendsCtrl', function($scope, $state, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $state, $stateParams, $ionicPopup, SavingService,ExpenseService, IncomeService, SessionService, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.add = function(){
        $scope.data = {};
        var alertPopup = $ionicPopup.show({
            title: 'Add Something!',
            subTitle: 'Choose one',
            templateUrl: 'templates/addinc.html',
            scope: $scope,

            buttons: [
            { text: 'Cancel'}
             
            ]
        }); 

        $timeout(function() {
        alertPopup.close();
          }, 5000);

        alertPopup.then(function(res) {
            console.log('Tapped!', res)
        });
    };
    IncomeService.getTotal().then(function(data) {
      
      var total = 0; 
      $scope.incomes = data;
      if ($scope.incomes.length > 0) {
        for (var i = 0; i < $scope.incomes.length; i++) {     
        total += parseInt($scope.incomes[i].amount);             
        } ;
      }
      IncomeService.getToday().then(function(data) {
      
      var total = 0; 
      var itotal = data;  
      //console.log(total);       
     
      });
      $scope.itotals = function() { return total;}
       $scope.itoday = function() { return itotal;}
    });

    ExpenseService.getTotal().then(function(data) {
        
        var total = 0; 
        $scope.expenses = data; 
        if ($scope.expenses.length > 0) {
        for (var i = 0; i < $scope.expenses.length; i++) {   
        total += parseInt($scope.expenses[i].amount);             
         };
        }
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
        $scope.saving = data;
        if ($scope.saving.length > 0) {
          for (var i = 0; i < $scope.saving.length; i++) {   
          total += parseInt($scope.saving[i].amount); }
        }
        else {  total = 0; }
        console.log($scope.saving) ;
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
        var sav = $scope.stotals();
        total = inc - exp - sav;
        
        return total;
        
    };
})

.controller('AccountCtrl', function($scope,$state, DateService, AccountService, SessionService, $stateParams, $timeout, $ionicPopup, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    $scope.data = {};
    AccountService.getAccount() 
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
        AccountService.getTotal().then(function(data) {      
           
          $scope.expenses = data;
          for (var i = 0; i < $scope.expenses.length; i++) {   
          total += parseInt($scope.expenses[i].amount); 
              
            }     
        });

        AccountService.getToday().then(function(data) {
          
          var total = 0; 
          total = data;  
           console.log(total);       
          $scope.totals = function() { return total;}
        });

        $scope.submit = function() { 
        if (!$scope.data.title ){
        var alertPopup = $ionicPopup.alert({
                title: 'Fields Empty!',
                template: 'Please fill in all details!'
            });  
        } else {
            $scope.date = DateService.getDate();
            $scope.incomes = [];
            AccountService.addAccount($scope.data.amount, $scope.date, $scope.data.title, $scope.data.type, $scope.data.notes) 
              .success(function(data) {
                var alertPopup = $ionicPopup.alert({
                title: 'Success!',
                template: 'Account added Successfully!'
                });   
                $state.go('app.profile');
              })
              .error(function(data) { 
               var alertPopup = $ionicPopup.alert({
                title: 'Failed!',
                template: 'Please try again!'
            });  
              });
        } 
        
      };


      $scope.logout = function() {
        SessionService.logout();
        $state.go('app.login');
       }
})

.controller('SavingCtrl', function($scope,$state, DateService, SavingService, SessionService, $stateParams, $timeout, $ionicPopup, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    $scope.data = {};
    SavingService.getSaving() 
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
        SavingService.getTotal().then(function(data) {      
           
          $scope.expenses = data;
          for (var i = 0; i < $scope.expenses.length; i++) {   
          total += parseInt($scope.expenses[i].amount); 
              
            } 
          $scope.totals = function() { return total;}    
        });

        SavingService.getToday().then(function(data) {
          
          var total = 0; 
          total = data;  
           console.log(total);       
          
        });

        $scope.submit = function() { 
        if (!$scope.data.title ){
        var alertPopup = $ionicPopup.alert({
                title: 'Fields Empty!',
                template: 'Please fill in all details!'
            });  
        } else {
            $scope.date = DateService.getDate();
            $scope.incomes = [];
            SavingService.addSaving($scope.data.amount, $scope.date, $scope.data.title, $scope.data.type, $scope.data.notes) 
              .success(function(data) {
                var alertPopup = $ionicPopup.alert({
                title: 'Success!',
                template: 'Saving added Successfully!'
                });   
                $state.go('app.profile');
              })
              .error(function(data) { 
               var alertPopup = $ionicPopup.alert({
                title: 'Failed!',
                template: 'Please try again!'
            });  
              });
        } 
        
      };


      $scope.logout = function() {
        SessionService.logout();
        $state.go('app.login');
       }
})

.controller('ExpenseCtrl', function($scope,$state, DateService, ExpenseService, SessionService, $stateParams, $timeout, $ionicPopup, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    $scope.data = {};
    ExpenseService.getExpense() 
        .then(function(data) {
          console.log('Response receieved');
          $scope.expenses = data;
                
          $scope.all = function() {
          return $scope.expenses;
          };
          $scope.remove = function(income) {
            incomes.splice(incomes.indexOf(income), 1);
          };  
        }); 
        
        var total = 0;
        ExpenseService.getTotal().then(function(data) {      
           
          $scope.expensed = data;
          for (var i = 0; i < $scope.expensed.length; i++) {   
          total += parseInt($scope.expensed[i].amount); 
              
            }     
        });

        ExpenseService.getToday().then(function(data) {
          
          $scope.etoday = data;  
           console.log($scope.etoday);       
         
        });

        $scope.totals = function() { return $scope.etoday;}

        $scope.submit = function() { 
        if (!$scope.data.title ){
        var alertPopup = $ionicPopup.alert({
                title: 'Fields Empty!',
                template: 'Please fill in all details!'
            });  
        } else {
            $scope.date = DateService.getDate();
            $scope.incomes = [];
            ExpenseService.addExpense($scope.data.amount, $scope.date, $scope.data.title, $scope.data.account, $scope.data.notes) 
              .success(function(data) {
                var alertPopup = $ionicPopup.alert({
                title: 'Success!',
                template: 'Expense added Successfully!'
                });   
                $state.go('app.profile');
              })
              .error(function(data) { 
               var alertPopup = $ionicPopup.alert({
                title: 'Failed!',
                template: 'Please try again'
            });  
              });
        } 
        
      };
    $scope.logout = function() {
      SessionService.logout();
      $state.go('app.login');
     }
})

.controller('IncomeCtrl', function($scope,$state, DateService, IncomeService, SessionService, $stateParams, $timeout, $ionicPopup, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

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
           
          $scope.incomes = data;
          for (var i = 0; i < $scope.incomes.length; i++) {   
          total += parseInt($scope.incomes[i].amount); 
              
            }     
        });

        IncomeService.getToday().then(function(data) {
          
          var total = 0; 
          total = data;  
           console.log(total);       
          $scope.totals = function() { return total;}
        });

        $scope.submit = function() { 
        if (!$scope.data.title ){
        var alertPopup = $ionicPopup.alert({
                title: 'Fields Empty!',
                template: 'Please fill in all details!'
            });  
        } else {
            $scope.date = DateService.getDate();
            $scope.incomes = [];
            IncomeService.addIncome($scope.data.amount, $scope.date, $scope.data.title, $scope.data.account, $scope.data.notes) 
              .success(function(data) {
                var alertPopup = $ionicPopup.alert({
                title: 'Success!',
                template: 'Income added Successfully!'
                });   
                $state.go('app.profile');
              })
              .error(function(data) { 
               var alertPopup = $ionicPopup.alert({
                title: 'Failed!',
                template: 'Please try again'
            });  
              });
        } 
        
      };


      $scope.logout = function() {
        SessionService.logout();
        $state.go('app.login');
       }
})

.controller('GalleryCtrl', function($scope,$state, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, SessionService) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

;
