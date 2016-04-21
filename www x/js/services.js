angular.module('starter.services', [])

/*
.factory('sessionService', ['$http', function($http) {
  return {
    set:function(key,value){
      return sessionStorage.setItem(key,value);
    },
    get:function(key){
      return sessionStorage.getItem(key);
    },
    destroy:function(key){ 
      $http.post['../PHP/app/logout.php  ']
      return sessionStorage.removeItem(key);
    }
  };
}])

*/
.service('SessionService', function($http, $q, USER_ROLES) {
    var LOCAL_TOKEN = "Authentic";
    var isAuthenticated = false;
    var usertype = 'public';
    var role = '';
    var authToken;

    function sessionStorage(token) {
        window.localStorage.setItem(LOCAL_TOKEN, token);
        useSession(token);
    };

    function loadUserSession(){
      var token = window.localStorage.getItem(LOCAL_TOKEN);
      if (token) {
        useSession(token);
      }
    };

    function useSession(token) {
        usertype = token.split('.')[0];
        isAuthenticated = true;
        authToken = token;

        if (usertype == 'business') {
          role = USER_ROLES.business;
        }
        if (usertype == 'public') {
          role = USER_ROLES.public;
        }
        $http.defaults.headers.common['X-Auth-Token'] = token;
    };

    function destroySession(){
      authToken = undefined;
      usertype = '';
      isAuthenticated = false;
      $http.defaults.headers.common['X-Auth-Token'] = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN, token);
    }

    var logout = function(){
        destroySession();
    };

    var isAuthorised = function(authorizedRoles){
        if (!angular.isArray(authorizedRoles)){
          authorizedRoles = [authorizedRoles];
        }
        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
    };

    loadUserSession();

    return {
      //login: LoginService,
      logout: logout,
      isAuthorised: isAuthorised,
      isAuthenticated: function() {
        return isAuthenticated;
      },
      role: function (){return role;}
    };

})

.service('SignupService', function($http, $q) {
    return {
        signupUser: function(username, email, password, type) {
            
            var deferred = $q.defer();
            var promise = deferred.promise; 

             var data = { username, email, password, type};

            
            $http.post("http://localhost/Mine/PerFinance/www/app/signup.php", data)
                .success(function(response) { 
                    var id = response;               
                    deferred.resolve();
                }).error(function(response) {                
                     deferred.reject('Wrong credentials.');
                })
              ; 
                    
            
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

.service('LoginService', function($q , $http , SessionService ) {
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
    
  })
/*
.factory('AuthInterceptor', function($rootscope, $q, AUTH_EVENTS)){
  return {
    responseError: function(response){
      $rootscope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  }
}

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');   
})
*/
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
                    .error(function(response) {    
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
              .error(function(response) {    
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
              .error(function(response) {    
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
                //console.log(incomes); 
                deferred.resolve(incomes);
              
              })
              .error(function(response) {    
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
                    .error(function(response) {    
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
              .error(function(response) {    
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
              .error(function(response) {    
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

        getExpense: function() {
          var deferred = $q.defer();
            var data = [];
            $http.get("http://localhost/Mine/PerFinance/www/app/getexpense.php", data)
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
          $http.get("http://localhost/Mine/PerFinance/www/app/getexpense.php", data)
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
                var t = da;
                deferred.resolve(t);
              
              })
              .error(function(response) {    
                  console.log(error);            
                  deferred.reject('Wrong credentials.');
                });
            
        return deferred.promise; 
          
        } 
      }

})

.factory('Account', function($q) {
  // Might use a resource here that returns a JSON array
  return {
        addIncome: function(amount, title) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (amount !== '' && title !== '') {
                deferred.resolve('Account ' + title + 'created with' + amount);
            } else {
                deferred.reject('A field is missing.');
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


.factory('Views', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var views = [{
    id: 0,
    name: 'Cash',
    amount: '2000/-',
    type: 'personal'
  }, {
    id: 1,
    name: 'Max Limited',
    amount: '22000/-',
    type: 'work'
  }, {
    id: 2,
    name: 'Equity Bank',
    amount: '12000/-',
    type: 'bank'
  }, {
    id: 3,
    name: 'Family Bank',
    amount: '20000/-',
    type: 'bank'
  }, {
    id: 4,
    name: 'M-Pesa',
    amount: '2300/-',
    type: 'personal'
  }];

  return {
    all: function() {
      return views;
    },
    remove: function(view) {
      views.splice(views.indexOf(chat), 1);
    },
    get: function(viewId) {
      for (var i = 0; i < views.length; i++) {
        if (views[i].id === parseInt(viewId)) {
          return views[i];
        }
      }
      return null;
    }
  }
})
/**
 * A simple example service that returns some data.
 */

;
