/// <reference path="movie.app.api.js" />

;

(function (window, undefined) {

    "use strict";

    var blades = function (customSettings) {

        return new blades.fn.init(customSettings);

    };

    blades.fn = blades.prototype = {

        constructor: blades,

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

    // Give the init function the blades prototype for later instantiation
    blades.fn.init.prototype = blades.fn;

    return (window.blades = blades);

}(window));






