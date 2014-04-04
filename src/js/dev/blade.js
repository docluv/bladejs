/// <reference path="movie.app.api.js" />

;

(function (window, undefined) {

    "use strict";

    var blade = function (customSettings) {

        return new blade.fn.init(customSettings);

    };

    blade.fn = blade.prototype = {

        constructor: blade,

        init: function (customSettings) {

            var that = this;

            that.settings = $().extend({}, that.settings, customSettings);

            //custom setup functionality

            return that;
        },

        version: "0.0.1",

        //members go here

        settings: {
            //custom settings go here
        }

    };

    // Give the init function the blade prototype for later instantiation
    blade.fn.init.prototype = blade.fn;

    return (window.blade = blade);

}(window));






