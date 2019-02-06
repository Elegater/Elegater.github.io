function otherResourcesSetup(){
    $("#otherResourcesModal").iziModal({
        title: "Other Useful Resources",
        padding: "15px",
        radius: "10px",
        transitionIn: "bounceInDown",
        transitionOut: "bounceOutUp"
    });

    $("#otherResources").click(function(){
        $("#otherResourcesModal").iziModal("open");
    });
}