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