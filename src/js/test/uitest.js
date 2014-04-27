var b = blades({ "selector": ".blades-wrapper" });

function getMarkup(url, callback) {

    var xhr = new XMLHttpRequest();

    xhr.open('get', url);
    xhr.setRequestHeader("Content-Type", "text/html");
    xhr.setRequestHeader("Accept", "text/html");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status == 200) {

            if (callback) {
                callback(xhr.responseText);
            }
        }
    };

    xhr.send();

};

function addBlade(obj) {

    var selector = obj.selector,
        src = obj.source,
        callback = obj.callback;

    getMarkup(src, function (html) {

        b.addBlade(blade({
            selector: selector,
            html: html
        }), callback);

    });

};


addBlade({

    selector: ".blade1",
    source: "http://localhost:20049/src/js/test/blade1.html",
    callback: function () {

        document.querySelector(".blade1 p")
            .addEventListener("click", function () {
                addBlade2();
            });

    }
});

function addBlade2() {

    addBlade({
        selector: ".blade2",
        source: "http://localhost:20049/src/js/test/blade2.html",
        callback: function () {

            document.querySelector(".blade2")
                .addEventListener("click", function () {

                    addBlade3();

                });

        }
    });
}

function addBlade3() {

    addBlade({
        selector: ".blade3",
        source: "http://localhost:20049/src/js/test/blade3.html",
        callback: function () {

            document.querySelector(".blade3")
            .addEventListener("click", function () {

                addBlade4();

            });
        }
    });
}

function addBlade4() {

    addBlade({
        selector: ".blade4",
        source: "http://localhost:20049/src/js/test/blade4.html",
        callback: function () {

        }
    });

}