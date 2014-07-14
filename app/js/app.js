'use strict';

/* App Module */
/*"use strict";
var demoApp = angular.module("demoApp", ["ngRoute"]);
demoApp.config(function ($routeProvider) {
	$routeProvider
		.when("/view1",
			{
				controller: "SimpleController",
				templateUrl: "partials/view1.html"
			})
		.when("/view2",
			{
				controller: "SimpleController",
				templateUrl: "partials/view2.html"
			})
		.otherwise({ redirectTo: "/view1"});
});*/


var demoApp = angular.module('demoApp', ['ui.router']);

demoApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/demo');
    
    $stateProvider.state("demo", {
        url          : "/demo",
        views : {
            // the main template will be placed here (relatively named)
            "": { 
                templateUrl : "partials/app-ui-panel-mask.html",
                controller  : "panelController"
            },
            "login1@demo": { 
                templateUrl : "partials/app-ui-login-mask.html",
                resolve: {  
                    title: function(){
                        return {value: "Login 1"};
                    }
                },
                controller  : "loginController"
            },
 
            "login2@demo": { 
                templateUrl : "partials/app-ui-login-mask.html",
                resolve: {  
                    title: function(){
                        return {value: "Login 2"};
                    }
                },
                controller  : "loginController"
            },
            "login3@demo": { 
                templateUrl : "partials/app-ui-login-mask.html",
                resolve: {  
                    title: function(){
                        return {value: "Login 3"};
                    }
                },
                controller  : "loginController"
            },
            "login4@demo": { 
                templateUrl : "partials/app-ui-login-mask.html",
                resolve: {  
                    title: function(){
                        return {value: "Login 4"};
                    }
                },
                controller  : "loginController"
            }
        } 
    });
});

