angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $state, $stateParams, $ionicHistory, $pouchDB, $ionicModal, $ionicPopover, $timeout,  $location, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page     active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
$scope.user = {username:'',password:''};
$scope.app = {devicevalues1:'',devicevalues2:''}
$scope.inputForm = {temperature:'',pressure:''};

 $scope.items = {};

    $pouchDB.startListening();

    $rootScope.$on("$pouchDB:change", function(event, data) {
        $scope.items[data.doc._id] = data.doc;
        $scope.$apply();
    });

 $rootScope.$on("$pouchDB:delete", function(event, data) {
        delete $scope.items[data.doc._id];
        $scope.$apply();
    });

    if($stateParams.documentId) {
        $pouchDB.get($stateParams.documentId).then(function(result) {
            $scope.inputForm = result;
        });
    }

//start

 HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {

var vm = this;

        vm.user = null;
        vm.allUsers = [];
        //vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }
}
//end
     $scope.save = function(temperature, pressure) {
        var jsonDocument = {
            "temperature": temperature,
            "pressure": pressure,
           
        };
        if($stateParams.documentId) {
            jsonDocument["_id"] = $stateParams.documentId;
            jsonDocument["_rev"] = $stateParams.documentRevision;
        }
        $pouchDB.save(jsonDocument).then(function(response) {
            $state.go("list");
        }, function(error) {
            console.log("ERROR -> " + error);
        });
    }    

  $scope.register = function(username,password,email, phonenumber) {
        var jsonDocument = {
            "username" : username,
             "password": password,
            "email": email,
            "phonenumber": phonenumber
        };
        if($stateParams.documentId) {
            jsonDocument["_id"] = $stateParams.documentId;
            jsonDocument["_rev"] = $stateParams.documentRevision;
        }
        $pouchDB.save(jsonDocument).then(function(response) {
            $state.go("list");
        }, function(error) {
            console.log("ERROR -> " + error);
        });
    }

    $scope.delete = function(id, rev) {
        $pouchDB.delete(id, rev);
    }

    $scope.back = function() {
        $ionicHistory.goBack();
    }


  //--------------------------------------------
   $scope.login = function(user) {
    
		if(typeof(user)=='undefined'){
			$scope.showAlert('Please fill user   name and password to proceed.');	
			return false;
		}

		if(user.username=='admin' && user.password=='admin'){
			$location.path('/app/userdetails');
		}else{
			$scope.showAlert('Invalid username or password.');	
                }
		
	};
  //--------------------------------------------
  $scope.logout = function() {   $location.path('/app/login');   };
  //--------------------------------------------
   // An alert dialog
	 $scope.showAlert = function(msg) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'Warning Message',
		 template: msg
	   });
	 };
  //--------------------------------------------
})

.controller('DevicesCtrl', function($scope) {
  
})

.controller('DeviceCtrl', function($scope) {
	
})


.controller('DetailCtrl', function($scope) {
	
});



