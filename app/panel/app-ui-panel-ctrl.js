'use strict';
/*  controller+model component [PC+PM+PL]  */
demoApp.controller("panelController", function($scope) {

    /*  presentation model [PM]  */
	$scope.dataStatus = "";
	$scope.paramClearafter = 5;
    $scope.reset = function () {
        /*  deliver reset action event  */
        $scope.$broadcast("content-reset");
    };

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

    /*  show login action information  */
    $scope.$on("login", function (event, data) {
    	var realm    = data[0];
    	var username = data[1];
    	var password = data[2];
    	var msg = "login with realm " + realm    +
                  ", username "       + username +
                  " and password "    + password + "";

        /*  show in own view via model  */
        $scope.dataStatus = msg;
    });
});