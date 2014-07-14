'use strict';

/* Directives */
demoApp.directive('focusInput', function($timeout) {
  return {
    link: function(scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
        if(event.which === 13) {
            scope.$apply(function (){
                scope.$eval(attrs.ngEnter);
            });
            $timeout(function() {
                element.parent().parent().parent().parent().find('input')[1].focus();
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
    element.bind("keydown keypress", function (event) {
        if(event.which === 13) {
            scope.$apply(function (){
                scope.$eval(attrs.ngEnter);
            });
            $timeout(function() {
                console.log(element);
                var loginBtn = (element.parent().parent().parent().parent().find('input')[2]);
                loginBtn.trigger('click');
                console.log(loginBtn);
            });
            event.preventDefault(element.html());
        }
    });
    }
  };
});