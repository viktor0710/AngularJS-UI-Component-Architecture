'use strict';

/* Controllers */

demoApp.controller("SimpleController", function ($scope, customerModel) {
	

	$scope.customerModel = customerModel;
	
	$scope.addCustomer = function () {
		customerModel.addCustomer($scope.newCustomer);
	};

	$scope.selectCustomer = function(customer) {
		customerModel.setSelectedCustomer(customer);
	};
});

// let's define the scotch controller that we call up in the about state
demoApp.controller("loginController", function($scope, title, businessLogic) {
    
    /*  feed model with title [PP]  */
    $scope.paramTitle = title.value;
    $scope.paramRealms = [];

    $scope.commandReset="";

    $scope.dataRealm    = "";
    $scope.dataUsername = "";
    $scope.dataPassword = "";

    $scope.stateUsername = "";
    $scope.stateUsernameHint ="";
    $scope.statePassword="";
    $scope.statePasswordHint="";
    $scope.stateHashcodeCol="";
    $scope.stateHashcodeTxt="";
    $scope.stateLoginAllowed="";
    $scope.stateLoginRequested="";

	/*  feed model with realms [PP]  */
	$scope.loadRealms = function () {
		businessLogic.loadRealms(function (realms) {
			$scope.paramRealms = realms;
			$scope.dataRealm = realms[0];
			$scope.$apply();
		});
	}();

	var determine_button_enabled = function () {
        $scope.stateLoginAllowed =     ($scope.stateUsername === "valid")
        							&& ($scope.statePassword === "valid");
    };

	$scope.$watch("dataUsername", function (newUsername) {
        if (newUsername === "") {
            $scope.stateUsername = "empty";
            $scope.stateUsernameHint = "please enter your username";
        } else if (!newUsername.match(/^[a-z][a-z0-9]*$/)) {
            $scope.stateUsername = "error";
            $scope.stateUsernameHint = "sorry, invalid username";
        } else {
        	$scope.stateUsername = "valid";
            $scope.stateUsernameHint = "";
        }
        determine_button_enabled();
    });

    $scope.$watch("dataPassword", function (newPassword) {
    	if (newPassword === "") {
            $scope.statePassword = "empty";
            $scope.statePasswordHint = "please enter your password";
        } else if (!newPassword.match(/^[^\s]{6,}$/)) {
            $scope.statePassword = "error";
            $scope.statePasswordHint = "sorry, invalid password";
        } else {
            $scope.statePassword = "valid";
            $scope.statePasswordHint = "";
        }
        determine_button_enabled();
        var hash = businessLogic.hashPassword(newPassword);
        $scope.stateHashcodeTxt = hash.txt;
        $scope.stateHashcodeCol = "c" + hash.col;
    });
   
    $scope.loginRequested = function () {
        $scope.$emit("login",[$scope.dataRealm, $scope.dataUsername, $scope.dataPassword]);
    };

    //subscribe on reset event
    $scope.$on("content-reset", function() {
    	$scope.dataRealm = $scope.paramRealms[0];
    	$scope.dataUsername = "";
    	$scope.dataPassword = "";
    });
});

demoApp.controller("panelController", function($scope) {

	$scope.dataStatus = "";
	$scope.paramClearafter = 5;    

    $scope.$on("login", function (event, data) {
    	var realm    = data[0];
    	var username = data[1];
    	var password = data[2];
    	var msg = "login with realm " + realm    +
                  ", username "       + username +
                  " and password "    + password + "";

        $scope.dataStatus = msg;
    });

    /*  presentation logic [PL]  */
    var self = this;
    $scope.$watch("dataStatus", function () {
    	if (self.timer !== null) {
            clearTimeout(self.timer);
        }
        self.timer = setTimeout(function () {
            $scope.dataStatus = "";
            $scope.$apply();
        }, $scope.paramClearafter * 1000);
    });

    $scope.reset = function () {
    	$scope.$broadcast("content-reset");
    };
});
