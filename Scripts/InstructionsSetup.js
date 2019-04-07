function instructionsSetup(){
    $("#instructionsBtn").click(function(){
        $("#instructionsDiv").collapse("toggle");
    });

    $("#hideInstructionsBtn").click(function(){
        $('html, body').animate({
            scrollTop: $('#instructionsCard').offset().top
        }, 200);
    })
}