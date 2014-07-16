'use strict';

/* Services */

demoApp.service('businessLogic', function () {

	this.loadRealms = function (callback) {
		/*  simulate a slow backend communication  */
        setTimeout(function () {
            callback([ "foo", "bar", "baz", "quux" ]);
        }, 1.0 * 1000)
	};

	this.hashPassword = function (password) {
        var djbhash = function (str) {
            var h = 5381;
            for (var i = 0; i < str.length; i++) {
                h = ((h << 5) + h) + str.charCodeAt(i);
            }
            h = Math.abs(h % 0xffffffff);
            return h;
        }
        var mkletter = function (i) {
            return String.fromCharCode("A".charCodeAt(0) + i);
        }
        var result = { txt: "&nbsp;&nbsp;", col: 0 };
        if (password !== "") {
            var h = djbhash(password);
            result.col  = 1 + (h % 3);      h /= 3;
            result.txt  = mkletter(h % 24); h /= 24;
            result.txt += mkletter(h % 24);
        }
        return result;
    };          
});