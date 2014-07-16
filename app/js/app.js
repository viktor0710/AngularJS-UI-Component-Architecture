'use strict';

var demoApp = angular.module("demoApp", ["ui.router"]);

demoApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise("/demo");
    
    $stateProvider.state("demo", {
        url          : "/demo",
        views : {
            // the main template will be placed here (relatively named)
            "": { 
                templateUrl : "panel/app-ui-panel-mask.html",
                controller  : "panelController"
            },
            "login1@demo": { 
                templateUrl : "login/app-ui-login-mask.html",
                resolve: {  
                    title: function(){
                        return {value: "Login 1"};
                    }
                },
                controller  : "loginController"
            },
 
            "login2@demo": { 
                templateUrl : "login/app-ui-login-mask.html",
                resolve: {  
                    title: function(){
                        return {value: "Login 2"};
                    }
                },
                controller  : "loginController"
            },
            "login3@demo": { 
                templateUrl : "login/app-ui-login-mask.html",
                resolve: {  
                    title: function(){
                        return {value: "Login 3"};
                    }
                },
                controller  : "loginController"
            },
            "login4@demo": { 
                templateUrl : "login/app-ui-login-mask.html",
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

