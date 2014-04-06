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

            that.selector = settings.selector;

            //custom setup functionality

            document.querySelector(that.settings.removeBlade)
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
            
            var that = this,
                width = 0,
                anchor = document.querySelector(that.settings.bladesAnchor),
                anchorWidth = parseInt(anchor.style.width, 0),
                blade, key, style;

            for(key in that.blades){
                
                blade = that.blades[key];

                if(typeof blade.width === "function"){
                    width += parseInt(blade.width.call(blade), 10);
                }else{

                    style = window.getComputedStyle(
                        document.querySelector(blade.selector)
                    );

                    width += parseInt(style.width, 10);
                    width += parseInt(style.marginLeft, 10);
                    width += parseInt(style.marginRight, 10);
                    width += parseInt(style.paddingLeft, 10);
                    width += parseInt(style.paddingRight, 10);
                }

            }

            //use px for now, eventually a setting to define units?
            requestAnimationFrame(function(){
                
                anchor.style.width = width + "px";

                setTimeout(function(){
                    document.querySelector(that.settings.bladesWrapper)
                            .scrollLeft = width;
                }, 500);

            });

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
            
            if(!blade.selector || !blade.html){
                return false;
            }

            return true;
        },

        //an object to hold media queries that 
        //should execute responsive callbacks
        mediaQueries:{},

        settings: {
            //custom settings go here
            removeBlade : ".remove-blade",
            bladesAnchor : ".blades-anchor",
            bladesWrapper : ".blades-wrapper",
            bladeClass: "blade"

        }

    };

    // Give the init function the blades prototype for later instantiation
    blades.fn.init.prototype = blades.fn;

    return (window.blades = blades);

}(window));






