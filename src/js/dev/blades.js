/// <reference path="movie.app.api.js" />

;

(function (window, undefined) {

    "use strict";

    var blades = function (customSettings) {

        return new blades.fn.init(customSettings);

    };

    blades.fn = blades.prototype = {

        constructor: blades,

        init: function (settings) {

            var that = this;

         //   that.settings = $().extend({}, that.settings, customSettings);

            that.selector = settings.selector;

            //custom setup functionality

            document.querySelector(that.settings.removeBlasde)
                    .addEventListener("click", function(){
                        
                        that.removeLastBlade();
                    });

            return that;
        },

        version: "0.0.1",

        //members go here

        width: 0,
        height: 0,
        count: 0,

        selector: "",
        elem: undefined, //target element
        wrapperelem: undefined,

        blades: {},
        
        setDimensions: function(){
            
            var width = 0,
                blade, key;

            for(key in this.blades){
                
                blade = this.blades[key];

                if(typeof blade.width === "function"){
                    width += parseInt(blade.width.call(blade), 10);
                }else{
                    width += parseInt(blade.width, 10);
                }

            }

            //use px for now, eventually a setting to define units?
            document.querySelector(this.settings.bladesAnchor)
                        .style.width = width + "px";

        },

        removeLastBlade: function(){
            
            var key, blade;

            for(key in this.blades){
                
                blade = this.blades[key];

            }

            this.removeBlade(blade);

        },

        addBlade: function(blade, callback){
            
            //assume it is a blade object for now,
            //later test for a dynamic object
            if(typeof blade !== "object" ||
                !this.isABlade(blade) ||
                this.doesBladeExist(blade)){
                
                //get out because we obviously can't use this.
                return;
            }

            this.blades[blade.selector] = blade;
            this.count += 1;

            var newBlade = document.createElement("div");

            newBlade.classList.add(this.settings.bladeClass);
            newBlade.classList.add(blade.selector
                    .replace(".", "")
                    .replace("#", ""));

            newBlade.innerHTML = blade.html;

            document.querySelector(this.settings.bladesAnchor)
                    .appendChild(newBlade);

            this.setDimensions();

            if(callback){
                callback.call(blade);
            }

        },

        removeBlade: function(blade){

            if(this.count === 0){
                return;
            }
            
            if(typeof blade === "string"){
                //get the object
                blade = this.blades[blade];
            }

            if(!blade || typeof blade === "string"){
                //no blade by this name exist, stop
                return;
            }

            delete this.blades[blade.selector];
            this.count -= 1;

            document.querySelector(this.settings.bladesAnchor)
                .removeChild(document.querySelector(blade.selector));

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
            removeBlasde : ".remove-blade",
            bladesAnchor : ".blades-anchor",
            bladeClass: "blade"

        }

    };

    // Give the init function the blades prototype for later instantiation
    blades.fn.init.prototype = blades.fn;

    return (window.blades = blades);

}(window));






