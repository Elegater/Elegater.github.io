function dailiesTrackerSetup() {
    // Setting up dailies modal
    $("#dailies").iziModal({
        title: "Daily Mission Tracker",
        padding: "10px",
        radius: "10px",
        transitionIn: "bounceInDown",
        transitionOut: "bounceOutUp"
    });
    $("#dailyMission").click(function () {
        $("#dailies").iziModal("open");
    });

    var smallScreen = $(window).width() < 800;
    if(smallScreen){
        $(".dailyRow>td,.dailyRow>th").css("font-size", "6pt", "max-width", "70px");
    }

    updateDailyTable();

    $(document).on('opening', '#dailies', function (e) {
        updateDailyTable();
    })
}

function updateDailyTable() {
    // Setting up dailies listing
    var baseDate = moment.utc([2024, 1, 9, 0]);   // Setting base date on the first element in the dailies array. [y, m, d, h]: only m is zero based;
    
    var currentDateTime = moment.utc();
    var daysSinceBase = currentDateTime.diff(baseDate, "days");
    var dayToPick = daysSinceBase % dailies.length;      // The index in dailies array corresponding to the mission from yesterday    
    var dailiesImport = dailies.slice(0);

    for (var j = 0; j < dayToPick; j++) {                    // Import yesterday's mission together with today's + all other mission ahead in cycle
        dailiesImport.push(dailiesImport.shift());
    }

    // Setting reset time
    var resetTime = moment.utc().startOf("date").local().format("h:mm A");
    $("#resetTimeDaily").html(resetTime);

    // Calculating mission numbers to display
    var baseMissionNo = 2961;
    var todayMissionNo = baseMissionNo + daysSinceBase;

    var firstDate = moment.utc().startOf("date").local().add(i, "days") - 1;
    $("#dailyNo1").html("#" + (todayMissionNo - 1));
        $("#dailyDate1").html(firstDate.format("D MMM"));
        $("#dailyMapA1").html(dailiesImport[dailies.length - 1].mapA);
        $("#dailyTypeA1").html(dailiesImport[dailies.length - 1].typeA);
        $("#dailyMapB1").html(dailiesImport[dailies.length - 1].mapB);
        $("#dailyTypeB1").html(dailiesImport[dailies.length - 1].typeB);
        $("#dailyMapC1").html(dailiesImport[dailies.length - 1].mapC);
        $("#dailyTypeC1").html(dailiesImport[dailies.length - 1].typeC);

    for (var i = 1; i < dailies.length + 1; i++) {
        var row = i + 1;
        var rowDate = moment.utc().startOf("date").local().add(i, "days");
        $("#dailyNo" + row).html("#" + (todayMissionNo + i));
        $("#dailyDate" + row).html(rowDate.format("D MMM"));
        $("#dailyMapA" + row).html(dailiesImport[i % dailies.length].mapA);
        $("#dailyTypeA" + row).html(dailiesImport[i % dailies.length].typeA);
        $("#dailyMapB" + row).html(dailiesImport[i % dailies.length].mapB);
        $("#dailyTypeB" + row).html(dailiesImport[i % dailies.length].typeB);
        $("#dailyMapC" + row).html(dailiesImport[i % dailies.length].mapC);
        $("#dailyTypeC" + row).html(dailiesImport[i % dailies.length].typeC);
    }
}
