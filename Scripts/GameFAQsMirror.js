function GameFAQsMirrorSetup(){
    $("#GameFAQsMirrorModal").iziModal({
        title: "GameFAQs Mirror",
        padding: "15px",
        radius: "10px",
        transitionIn: "bounceInDown",
        transitionOut: "bounceOutUp"
    });

    $("#GameFAQsMirror").click(function(){
        $("#GameFAQsMirrorModal").iziModal("open");
    });
}
