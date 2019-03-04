function jumpToSearchSetup(){
    $("#jumpToSearch").click(function(){
        $('html, body').animate({
            scrollTop: $('#searchBox').offset().top
        }, 200);
        
        $('#searchBox')
        .val("")
        .trigger("input")
        .focus();
    });
}