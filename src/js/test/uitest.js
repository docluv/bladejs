function addBlade(selector, src, callback) {

    var newBlade = blade({
        selector: selector,
        source: src,
        callback: callback
    });
};

var b = blades({ "selector": ".blades-wrapper" }),

blade1 = blade({

    selector: ".blade1",
    source: "http://localhost:20049/src/js/test/blade1.html",
    callback: function () {

        this.width = "340";

        b.addBlade(this, function () {
            
            document.querySelector(".blade1")
            .addEventListener("click", function () {

                addBlade(".blade2",
                    "http://localhost:20049/src/js/test/blade2.html",
                    function () {

                        this.width = "540";

                        b.addBlade(this, function () {

            document.querySelector(".blade2")
            .addEventListener("click", function () {

                addBlade(".blade3",
                    "http://localhost:20049/src/js/test/blade3.html",
                    function () {

                        this.width = "640";

                        b.addBlade(this, function () {


                        });

                    }
                );

            });

                        });

                    }
                );

            });

        });

    }
});