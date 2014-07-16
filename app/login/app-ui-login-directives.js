'use strict';

/* Directives */
demoApp.directive('focusPasswordInput', function($timeout) {
  return {
    link: function(scope, element, attrs) {
    /*  convert RETURN key in username field to a focus click into password field  */
    element.bind("keydown keypress", function (event) {
        if(event.which === 13) {
            scope.$apply(function (){
                scope.$eval(attrs.ngEnter);
            });
            $timeout(function() {
                element.parent().parent().parent().parent().find("input")[1].focus();
            });
            event.preventDefault();
        }
    });
    }
  };
});

demoApp.directive('triggerLogin', function($timeout) {
  return {
    link: function(scope, element, attrs) {
    /*  convert RETURN key in password field to a click on login button  */
    element.bind("keydown keypress", function (event) {
        if(event.which === 13) {
            scope.$apply(function (){
                scope.$eval(attrs.ngEnter);
            });
            /*  $timeout is needed so that the focus() method is called after the browser renders (i.e., finishes handling the click event).  */
            $timeout(function() {
                scope.loginRequested();
            });
            event.preventDefault(element.html());
        }
    });
    }
  };
});