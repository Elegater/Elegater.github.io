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
        $(".dailyRow>td,.dailyRow>th").css("font-size", "8pt");
    }

    updateDailyTable();

    $(document).on('opening', '#dailies', function (e) {
        updateDailyTable();
    })
}

function updateDailyTable() {
    // Setting up dailies listing
    var baseDate = moment.utc([2019, 9, 21, 0]);   // Setting base date on the first element in the dailies array. [y, m, d, h]: only m is zero based;
    
    var currentDateTime = moment.utc();
    var daysSinceBase = currentDateTime.diff(baseDate, "days");
    var dayToPick = daysSinceBase % dailies.length;      // The index in dailies array corresponding to current mission    
    var dailiesImport = dailies.slice(0);

    for (var j = 0; j < dayToPick; j++) {
        dailiesImport.push(dailiesImport.shift());
    }

    // Setting reset time
    var resetTime = moment.utc().startOf("date").local().format("h:mm A");
    $("#resetTimeDaily").html(resetTime);

    // Calculating mission numbers to display
    var baseMissionNo = 1389;
    var todayMissionNo = baseMissionNo + daysSinceBase;

    for (var i = 0; i < dailies.length; i++) {
        var row = i + 1;
        var rowDate = moment.utc().startOf("date").local().add(i, "days");
        $("#dailyNo" + row).html("#" + (todayMissionNo + i));
        $("#dailyDate" + row).html(rowDate.format("D MMM"));
        $("#dailyMap" + row).html(dailiesImport[i].map);
        $("#dailyType" + row).html(dailiesImport[i].type);
    }
}