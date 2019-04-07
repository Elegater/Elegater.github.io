function pageOptionsSetup() {
    $("#pageOptions").iziModal({
        title: "Page Options",
        padding: "10px",
        radius: "10px",
        transitionIn: "bounceInDown",
        transitionOut: "bounceOutUp"
    });

    $("#pageOptionsButton").click(function () {
        $("#pageOptions").iziModal("open");
    });

    $("#btnBuildLink").click(function () {
        var baseURL = "https://elegater.github.io/";
        var optionTable = $("input[name=optionTable]:checked").val();
        var optionBtnPos = $("input[name=optionBtnPos]:checked").val();
        var outputURL = baseURL;

        var optionsArr = [optionTable, optionBtnPos];
        var options = "";

        if (optionTable || optionBtnPos) {
            outputURL = outputURL + "?";
        }

        for (var i = 0; i < optionsArr.length; i++) {
            if (optionsArr[i]) {
                options = options + "&" + optionsArr[i];
            }
        }

        options = options.substr(1);
        console.log(options);
        outputURL = outputURL + options;

        $("#builtLink").html(outputURL);
        $("#builtLink").prop("href", outputURL);
        $("#builtLink").show()
    });
}