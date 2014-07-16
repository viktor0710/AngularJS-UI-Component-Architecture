'use strict';
/*  controller+model component [PC+PM+PL]  */
demoApp.controller("loginController", function($scope, title, businessService) {
    
    
    /*  presentation model [PM]  */
    $scope.paramTitle = "";
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
    /*  event bind to presentation model click event [PA]  */
    $scope.loginRequested = function () {
        $scope.$emit("login",[$scope.dataRealm, $scope.dataUsername, $scope.dataPassword]);
    };

    var determine_button_enabled = function () {
        $scope.stateLoginAllowed =     ($scope.stateUsername === "valid")
        							&& ($scope.statePassword === "valid");
    };

    /*  presentation logic [PL]  */
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

    /*  presentation logic [PL]  */
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
        var hash = businessService.hashPassword(newPassword);
        $scope.stateHashcodeTxt = hash.txt;
        $scope.stateHashcodeCol = "c" + hash.col;
    });
   
    /*  feed model with title [PP]  */
    $scope.paramTitle = title.value;

    /*  feed model with realms [PP]  */
    $scope.loadRealms = function () {
        businessService.loadRealms(function (realms) {
            $scope.paramRealms = realms;
            $scope.dataRealm = realms[0];
            $scope.$apply();
        });
    }();

    /*  react upon general content reset event [PP]  */
    $scope.$on("content-reset", function() {
    	$scope.dataRealm = $scope.paramRealms[0];
    	$scope.dataUsername = "";
    	$scope.dataPassword = "";
    });
});