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

        width: 0,
        height: 0,

        elem: undefined, //target element
        wrapperelem: undefined,

        blades: {},
        
        setDimensions: function(){
            
            var width = 0,
                blade;

            for(key in this.blades){
                
                blade = this.blades[key];

                if(typeof blade.width === "function"){
                    width += blade.width.call(blade);
                }else{
                    width += blade.width;
                }

            }

            //use px for now, eventually a setting to define units?
            this.elem.style.clientWidth = width + "px";

        },

        addBlade: function(blade){
            
            //assume it is a blade object for now,
            //later test for a dynamic object
            if(typeof blade !== "object" ||
                !isABlade(blade) ||
                doesBladeExist(blade)){
                
                //get out because we obviously can't use this.
                return;
            }

            this.blades[blade.selector] = blade;

            this.elem.appendChild(document
                        .createDocumentFragment(blade.html));

            this.setDimensions();

        },

        removeBlade: function(blade){
            
            if(typeof blade === "string"){
                //get the object
                blade = this.blades[blade];
            }

            if(!blade || typeof blade === "string"){
                //no blade by this name exist, stop
                return;
            }

            delete this.blades[blade.selector];

            this.elem.removeChild(document.querySelector(blade.selector));

            this.setDimensions();

        },

        doesBladeExist: function(blade){
            
            if(blade.selector in this.blades){
                return true;
            }

        },

        //a safety check
        isABlade: function(blade){
            
            if(!blade.selector || !blade.html
                || !blade.width){
                return false;
            }

            return true;
        },

        //an object to hold media queries that 
        //should execute responsive callbacks
        mediaQueries:{},

        settings: {
            //custom settings go here
        }

    };

    // Give the init function the blades prototype for later instantiation
    blades.fn.init.prototype = blades.fn;

    return (window.blades = blades);

}(window));






