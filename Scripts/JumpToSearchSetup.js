function jumpToSearchSetup(btnPosition) {
    var btn = $("#jumpToSearch");
    btn.click(function () {
        $('html, body').animate({
            scrollTop: $('#searchBox').offset().top
        }, 200);

        resetSearch();    // Function in DataTablesSetup.js
    });

    // Setting up button position
    var verticalGap = "50px";
    var horizontalGap = "20px";

    if (btnPosition) {
        var corner = btnPosition.toLowerCase();

        if (corner == "topright" || corner == "topleft" || corner == "bottomleft") {
            if (corner.includes("top")) {
                btn.css("bottom", "");
                btn.css("top", verticalGap);
                $("body").css("padding-top", "90px");
                $("body").css("padding-bottom", "40px");
            }
            else if (corner.includes("bottom")) {
                btn.css("bottom", verticalGap);
            }

            if (corner.includes("left")) {
                btn.css("right", "");
                btn.css("left", horizontalGap);
            }
            else if (corner.includes("right")) {
                btn.css("right", horizontalGap);
            }
        }
    }
    else {
        btnDefault(btn, verticalGap, horizontalGap);
    }
}

function btnDefault(btn, verticalGap, horizontalGap) {
    btn.css("bottom", verticalGap);
    btn.css("right", horizontalGap);
}