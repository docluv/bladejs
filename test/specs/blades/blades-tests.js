
module("BladeJS Blade Unit Tests", {
    setup: function () {

    },
    teardown: function () {

    }
});



test("Verify We Have blade with expected members", function () {

    //basic sainty assertions to know members are present
    ok(blade, "blade object should exist");
    ok(blade.fn.init, "init function should exist");
    ok(blade.fn.version, "version should exist");
    equal(blade.fn.width, 0, "width should be 0");
    equal(blade.fn.height, 0, "height should be 0");
    equal(blade.fn.source, "", "source should be empty");
    equal(blade.fn.selector, "", "selector should be empty");
    equal(blade.fn.html, "", "html should exist");
    isFunction(blade.fn.getMarkup, "getMarkup function should exist");
    isObject(blade.fn.settings, "settings function should exist");
    equal(blade.fn.settings.source, "", "settings.source should exist");
    equal(blade.fn.settings.selector, "", "settings.selector should exist");

});


test("Verify a new blade instance sets the source and selector and calls getMarkup", function () {

    var selector = ".blade1",
        source = "http://localhost:20049/src/js/test/blade1.html",
        getMarkup = sinon.stub(blade.fn, "getMarkup"),
        blade1 = blade({

            selector: selector,
            source: source
        });

    equal(blade1.settings.source, source, "settings.source should exist");
    equal(blade1.settings.selector, selector, "settings.selector should exist");
    ok(getMarkup.called, "getMarkup should be called");
    equal(getMarkup.callCount, 1, "getMarkup should be called once");

});

