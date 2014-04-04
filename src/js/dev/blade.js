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

            that.selector = that.settings.selector;
            that.source = that.settings.source;

            if(typeof that.source === "string" &&
                that.source !== ""){

                    that.getMarkup(that.source,
                                    that.settings.callback);
                    
                }

            return that;
        },

        version: "0.0.1",

        //members go here,

        //these need to be the computed dimensions, padding, margin, width
        width: 0,
        height: 0,

        source: "",
        selector: "", //example .blade-x

        html: "",

        getMarkup: function (url, callback) {

            var that = this,
                xhr = new XMLHttpRequest();

            xhr.open('get', url);
            xhr.setRequestHeader("Content-Type", "text/html");
            xhr.setRequestHeader("Accept", "text/html");

            xhr.onreadystatechange = function (e) {
                if (xhr.readyState === 4 && xhr.status == 200) {
                    
                    that.html = this.responseText;

                    if(callback){
                        callback.call(that);
                    }
                }
            }

            xhr.send();

        },


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

        settings: {
            //custom settings go here
            source: "",
            selector: ""
        }

    };

    // Give the init function the blade prototype for later instantiation
    blade.fn.init.prototype = blade.fn;

    return (window.blade = blade);

}(window));






