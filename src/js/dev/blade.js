/// <reference path="blades.js" />

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

            if(customSettings && "object" === typeof customSettings){
                
                that.selector = customSettings.selector || "";
                that.html = customSettings.html || "";
                that.onload = customSettings.onload;
            
            }

            return that;
        },

        version: "0.0.1",

        //members go here,

        //these need to be the computed dimensions, padding, margin, width
        width: 0,
        height: 0,

        selector: "", //example .blade-x

        html: "",

        child: undefined,

        onload: undefined,

        mediaQueries: undefined,
        /*

        //start small and work up

        {
            breakpoint: "(max-width: 600px)",
            callback: function(){
                
                //set dimensions
                //make sure you set a reference to the
                //blade's object so you can set the 
                //height and width property
            }
        }

        */

    };

    // Give the init function the blade prototype for later instantiation
    blade.fn.init.prototype = blade.fn;

    return (window.blade = blade);

}(window));






