/* global angular, document, window */
'use strict';

angular.module('starter.services', [])

.service('LoginService', function($q , $http  ) {
    return {
        loginUser: function(name, password, type) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var data = { name, password, type};

            if (name !== '' && password !== '') {
                $http.post("http://localhost/Mine/PerFinance/www/app/login.php", data)
                    .success(function(response) { 
                     //  sessionStorage(type + '.Authentic');
                          deferred.resolve(response);
                      //  deferred.resolve();
                      
                    }).error(function(response) {    
                        console.err(response);            
                        deferred.reject('Wrong credentials.');
                    })
                  ;
            } else {
                deferred.reject('Missing credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
      
    }
})

.service('SignupService', function($http, $q) {
    return {
        signupUser: function(username, email, password, type) {
            
            var deferred = $q.defer();
            var promise = deferred.promise; 

            if (username !== '' && password !== '') {
             var data = { username, email, password, type};
            $http.post("http://localhost/Mine/PerFinance/www/app/signup.php", data)
                .success(function(response) {                                   
                    deferred.resolve(response);
                }).error(function(error) {                
                     deferred.reject('Wrong credentials.');
                })
              ; 
            } else {
                deferred.reject('Missing credentials.');
            }       
            
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
            
        }
        
    }
})

.factory('IncomeService', function($q, $http) {
  // Might use a resource here that returns a JSON array  
  return {
        
        addIncome: function(amount, date, title, account, notes) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var data = { amount, date, title, account, notes};            
            if (amount !== '' && title !== '' && account !== '') {
                $http.post("http://localhost/Mine/PerFinance/www/app/income.php", data)
                    .success(function(response) { 
                     //  sessionStorage(type + '.Authentic');
                        // console.log(response);
                        deferred.resolve( response);
                    })
                    .error(function(error) {    
                        console.log(error);            
                        deferred.reject('Wrong credentials.');
                      });

            } else {
                deferred.reject('A field is missing.');
            }
            promise.success = function(fn) {
                
                promise.then(fn);
                console.log(promise);
                return promise;          
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
      getIncome: function() {
        var deferred = $q.defer();
          var data = [];
          $http.get("http://localhost/Mine/PerFinance/www/app/getincome.php", data)
              .success(function(response) { 
                  deferred.resolve( response);
              })
              .error(function(error) {    
                  console.log(error);            
                  deferred.reject('Wrong credentials.');
                });
            
        return deferred.promise;
      },

      getTotal: function() {          
          
          var deferred = $q.defer();
          var data = [];
          $http.get("http://localhost/Mine/PerFinance/www/app/getincome.php", data)
              .success(function(incomes) {
                deferred.resolve(incomes);
              
              })
              .error(function(error) {    
                  console.log(error);            
                  deferred.reject('Wrong credentials.');
                });
            
        return deferred.promise; 
          
        } ,

      getToday: function() {          
          
          var deferred = $q.defer();
          var data = [];
          $http.get("http://localhost/Mine/PerFinance/www/app/getitoday.php", data)
              .success(function(incomes) {
                console.log(incomes); 
                deferred.resolve(incomes);
              
              })
              .error(function(error) {    
                  console.log(error);            
                  deferred.reject('Wrong credentials.');
                });
            
        return deferred.promise; 
          
        }        
      }
})

.factory('SavingService', function($q, $http) {
  // Might use a resource here that returns a JSON array  
  return {
        
        addIncome: function(amount, date, title, account, notes) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var data = { amount, date, title, account, notes};            
            if (amount !== '' && title !== '' && account !== '') {
                $http.post("http://localhost/Mine/PerFinance/www/app/income.php", data)
                    .success(function(response) { 
                     //  sessionStorage(type + '.Authentic');
                        // console.log(response);
                        deferred.resolve( response);
                    })
                    .error(function(error) {    
                        console.log(error);            
                        deferred.reject('Wrong credentials.');
                      });

            } else {
                deferred.reject('A field is missing.');
            }
            promise.success = function(fn) {
                
                promise.then(fn);
                console.log(promise);
                return promise;          
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
      getIncome: function() {
        var deferred = $q.defer();
          var data = [];
          $http.get("http://localhost/Mine/PerFinance/www/app/getincome.php", data)
              .success(function(response) { 
                  deferred.resolve( response);
              })
              .error(function(error) {    
                  console.log(error);            
                  deferred.reject('Wrong credentials.');
                });
            
        return deferred.promise;
      },

      getTotal: function() {          
          
          var deferred = $q.defer();
          var data = [];
          $http.get("http://localhost/Mine/PerFinance/www/app/getincome.php", data)
              .success(function(incomes) {
                deferred.resolve(incomes);
              
              })
              .error(function(error) {    
                  console.log(error);            
                  deferred.reject('Wrong credentials.');
                });
            
        return deferred.promise; 
          
        }        
      }
})

.factory('ExpenseService', function($q, $http) {
  // Might use a resource here that returns a JSON array
  return {
        
        addExpense: function(amount, date, title, account, notes) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var data = { amount, date, title, account, notes};            
            if (amount !== '' && title !== '' && account !== '') {
                $http.post("http://localhost/Mine/PerFinance/www/app/payments.php", data)
                    .success(function(response) { 
                     //  sessionStorage(type + '.Authentic');
                        //console.log(response);
                        deferred.resolve( response);
                    })
                    .error(function(error) {    
                        console.log(error);            
                        deferred.reject('Wrong credentials.');
                      });

            } else {
                deferred.reject('A field is missing.');
            }
            promise.success = function(fn) {                
                promise.then(fn);
                //console.log(promise);
                return promise;          
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },

        getExpense: function() {
          var deferred = $q.defer();
            var data = [];
            $http.get("http://localhost/Mine/PerFinance/www/app/getexpense.php", data)
                .success(function(response) { 
                 //  sessionStorage(type + '.Authentic');
                    //console.log(response);
                    deferred.resolve( response);
                })
                .error(function(error) {    
                    console.log(error);            
                    deferred.reject('Wrong credentials.');
                  });
              
          return deferred.promise;
        },

        getTotal: function() {          
          
          var deferred = $q.defer();
          var data = [];
          $http.get("http://localhost/Mine/PerFinance/www/app/getexpense.php", data)
              .success(function(expense) {
                deferred.resolve(expense);
              })
              .error(function(error) {    
                  console.log(error);            
                  deferred.reject('Wrong credentials.');
                });
            
        return deferred.promise; 
          
        },

        getToday: function() {          
          
          var deferred = $q.defer();
          var data = [];
          $http.get("http://localhost/Mine/PerFinance/www/app/getetoday.php", data)
              .success(function(expense) {
                console.log(expense); 
                deferred.resolve(expense);
              
              })
              .error(function(error) {    
                  console.log(error);            
                  deferred.reject('Wrong credentials.');
                });
            
        return deferred.promise; 
          
        }  
      }

})

.factory('AccountService', function($q, $http) {
  // Might use a resource here that returns a JSON array
  return {
        
        addAccount: function(amount, date, title, type, notes) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var data = { amount, date, title, type, notes};            
            if (amount !== '' && title !== '' && account !== '') {
                $http.post("http://localhost/Mine/PerFinance/www/app/accounts.php", data)
                    .success(function(response) { 
                     //  sessionStorage(type + '.Authentic');
                        //console.log(response);
                        deferred.resolve( response);
                    })
                    .error(function(response) {    
                        console.log(error);            
                        deferred.reject('Wrong credentials.');
                      });

            } else {
                deferred.reject('A field is missing.');
            }
            promise.success = function(fn) {                
                promise.then(fn);
                //console.log(promise);
                return promise;          
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },

        getAccount: function() {
          var deferred = $q.defer();
            var data = [];
            $http.get("http://localhost/Mine/PerFinance/www/app/getaccount.php", data)
                .success(function(response) { 
                 //  sessionStorage(type + '.Authentic');
                    //console.log(response);
                    deferred.resolve( response);
                })
                .error(function(response) {    
                    console.log(error);            
                    deferred.reject('Wrong credentials.');
                  });
              
          return deferred.promise;
        },

        getTotal: function() {          
          
          var deferred = $q.defer();
          var data = [];
          $http.get("http://localhost/Mine/PerFinance/www/app/getaccount.php", data)
              .success(function(expense) {
                deferred.resolve(expense);
              })
              .error(function(response) {    
                  console.log(error);            
                  deferred.reject('Wrong credentials.');
                });
            
        return deferred.promise; 
          
        },

        getToday: function() {          
          
          var deferred = $q.defer();
          var data = [];
          $http.get("http://localhost/Mine/PerFinance/www/app/getetoday.php", data)
              .success(function(da) {
                //console.log(da);
                deferred.resolve(da);
              
              })
              .error(function(response) {    
                  console.log(error);            
                  deferred.reject('Wrong credentials.');
                });
            
        return deferred.promise; 
          
        } 
      }

})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://pbs.twimg.com/profile_images/479740132258361344/KaYdH9hE.jpeg'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://pbs.twimg.com/profile_images/479740132258361344/KaYdH9hE.jpeg'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.service('DateService', function( ) {
      var dates = '';
    var retDate = function(date) {
        dates = date; 
    };

    var getDate = function() {
        return dates;
    };

    return {
          retDate: retDate,
          getDate: getDate
        };
    
  });
