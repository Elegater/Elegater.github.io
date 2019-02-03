function changeLogSetup(){
    // Setting up change log modal
    $("#changeLog").iziModal({
        title: "Apex Search Change Log",
        padding: "15px",
        radius: "10px",
        transitionIn: "bounceInDown",
        transitionOut: "bounceOutUp"
    });
    // Button to open change log
    $("#changeLogButton").click(function(){
        $("#changeLog").iziModal("open");
    });
}