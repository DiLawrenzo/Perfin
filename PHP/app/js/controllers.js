app.controller('loginCtrl', function($scope, $http){

	//variables

	//functions
.controller('SignCtrl', function($scope ,/* SignupService,*/ $http, $ionicPopup, $state) {
    $scope.signdata = {};

    $scope.signup = function() {
        /*SignupService.signupUser($scope.signdata.username, $scope.signdata.email, $scope.signdata.password, $scope.signdata.type).success(function(data) {
            
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Signup failed!',
                template: 'Please check your credentials!'
            });
        });*/
        var data = { name: $scope.signdata.username, 
                        email: $scope.signdata.email, 
                          pw : $scope.signdata.password, 
                        type: $scope.signdata.type
                      };
        $http.post("signup.php", data).success(function(response){
              console.log(response);
          }).error(function(error){
              console.error(error);
          });
        
    }
})

.controller('landCtrl', function(){})
.controller('loginCtrl', function(){})
	//init
}
	 
})