
module("bladesJS blades Unit Tests", {
    setup: function () {

    },
    teardown: function () {

    }
});



test("Verify We Have blades with expected members", function () {

    //basic sainty assertions to know members are present
    ok(blades, "blades object should exist");
    ok(blades.fn.init, "init function should exist");
    ok(blades.fn.version, "version should exist");
    equal(blades.fn.width, 0, "width should be 0");
    equal(blades.fn.height, 0, "height should be 0");
    equal(blades.fn.count, 0, "count should be 0");
    equal(blades.fn.elem, undefined, "source should be empty");
    equal(blades.fn.selector, "", "selector should be empty");
    equal(blades.fn.wrapperelem, undefined, "html should exist");
    
    isObject(blades.fn.blades, "blades function should exist");
    isObject(blades.fn.mediaQueries, "mediaQueries function should exist");
    isObject(blades.fn.settings, "settings function should exist");
    
    equal(blades.fn.settings.removeBlade, ".remove-blade", "settings.removeBlade should exist");
    equal(blades.fn.settings.bladesAnchor, ".blades-anchor", "settings.bladesAnchor should exist");
    equal(blades.fn.settings.bladeClass, "blade", "settings.bladeClass should exist");

    isFunction(blades.fn.setDimensions, "setDimensions function should exist");
    isFunction(blades.fn.removeLastBlade, "removeLastBlade function should exist");
    isFunction(blades.fn.addBlade, "addBlade function should exist");
    isFunction(blades.fn.removeBlade, "removeBlade function should exist");
    isFunction(blades.fn.doesBladeExist, "doesBladeExist function should exist");
    isFunction(blades.fn.isABlade, "isABlade function should exist");
});


test("Verify a new blades instance sets the source and selector and calls getMarkup", function () {

    var selector = ".blades1",
        blades1 = blades({

            selector: selector
        });

    equal(blades1.selector, selector, "settings.selector should exist");


});
