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

    updateDailyTable();

    $(document).on('opening', '#dailies', function (e) {
        updateDailyTable();
    })
}

function updateDailyTable() {
    // Setting up dailies listing
    var baseDate = moment.utc([2019, 0, 21, 0]);   // Setting base date on the first element in the dailies array (GP, Laser)
    var currentDateTime = moment.utc();
    var daysSinceBase = currentDateTime.diff(baseDate, "days");
    var dayToPick = daysSinceBase % 12;      // The index in dailies array corresponding to current mission    
    var dailiesImport = dailies.slice(0);

    for (var j = 0; j < dayToPick; j++) {
        dailiesImport.push(dailiesImport.shift());
    }

    // Calculating mission numbers to display
    var baseMissionNo = 1116;
    var todayMissionNo = baseMissionNo + daysSinceBase;

    for (var i = 0; i < 12; i++) {
        var row = i + 1;
        var rowDate = moment.utc().startOf("date").local().add(i, "days");
        $("#dailyNo" + row).html("#" + (todayMissionNo + i));
        $("#dailyDate" + row).html(rowDate.format("D MMM h:mmA"));
        $("#dailyMap" + row).html(dailiesImport[i].map);
        $("#dailyType" + row).html(dailiesImport[i].type);
    }
}