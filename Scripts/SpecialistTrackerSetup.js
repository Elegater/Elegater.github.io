function specialistsTrackerSetup(){
    // Setting up specialists modal
    $("#specialists").iziModal({
        title: "Specialist Mission Tracker",
        padding: "10px",
        radius: "10px",
        transitionIn: "bounceInDown",
        transitionOut: "bounceOutUp"
    });
    $("#specialistMission").click(function () {
        $("#specialists").iziModal("open");
    });

    var smallScreen = $(window).width() < 800;
    if(smallScreen){
        $(".specRow>td,.specRow>th").css("font-size", "8pt");
    }

    updateSpecialistTable();

    $(document).on('opening', '#specialists', function (e) {
        updateSpecialistTable();
    })
}

function updateSpecialistTable(){
    // Setting up dailies listing
    var baseDate = moment.utc([2023, 11, 30, 0]);   // Setting base date on the first element in the dailies array. [y, m, d, h]: only m is zero based;
    
    var currentDateTime = moment.utc();
    var daysSinceBase = currentDateTime.diff(baseDate, "days");
    var dayToPick = daysSinceBase % specialists.length;      // The index in dailies array corresponding to current mission    
    var specialistsImport = specialists.slice(0);

    for (var j = 0; j < dayToPick; j++) {
        specialistsImport.push(specialistsImport.shift());
    }

    // Setting reset time
    var resetTime = moment.utc().startOf("date").local().format("h:mm A");
    $("#resetTimeDaily").html(resetTime);

    // Calculating mission numbers to display
    var baseMissionNo = 2921;
    var todayMissionNo = baseMissionNo + daysSinceBase;

    for (var i = 0; i < specialists.length; i++) {
        var row = i + 1;
        var rowDate = moment.utc().startOf("date").local().add(i, "days");
        $("#dailyNo" + row).html("#" + (todayMissionNo + i));
        $("#dailyDate" + row).html(rowDate.format("D MMM"));
        $("#specialistsTheme" + row).html(specialistsImport[i].theme);
        $("#specialistsShips" + row).html(specialistsImport[i].ships);
    }
    // No more need for handling cases where specialist reset at the start of only Mondays and Saturdays (Weekday and Weekend Specialists)
    /*
    var baseDate = moment.utc([2019, 1, 11, 0]);   // Setting base date on the first element in the dailies array (GP, Laser)
    var currentDateTime = moment.utc();
    var daysSinceBase = currentDateTime.diff(baseDate, "days");
    var weeksSinceBase = Math.floor(daysSinceBase/7);
    var remainderDays = daysSinceBase - weeksSinceBase * 7;
    var missionOfWeek = Math.floor(remainderDays / 5);     // Zero based, 0 = weekday mission, 1 = weekend mission
    var missionsSinceBase = weeksSinceBase * 2 + missionOfWeek;
    var specialistsImport = specialists.slice(0);

    // Determining current mission map / type and setting up the data source array
    var missionToPick = missionsSinceBase % 7;
    for(var k = 0; k < missionToPick; k++){
        specialistsImport.push(specialistsImport.shift())
    }

    // Setting reset time
    var resetTime = moment.utc().startOf("date").local().format("h:mm A");
    $("#resetTimeSpec").html(resetTime);
    
    // Calculating mission numbers to display
    var baseMissionNo = 326;
    var currentMissionNo = baseMissionNo + missionsSinceBase;
    var currentMissionDate = baseDate.add(weeksSinceBase, "w");
    if(missionOfWeek === 1){
        currentMissionDate = currentMissionDate.add(5, "d");
    }

    var isWeekdayMission = true;
    
    // If the current mission started on Saturday
    if(currentMissionDate.isoWeekday() === 6){
        isWeekdayMission = false;
    }

    // Setting up array of mission dates to display
    var missionDates = [
        currentMissionDate.local().format("D MMM")
    ];
    // Setting up the adders used to create the array of dates
    var firstAdder = null;
    var secondAdder = null;
    if(isWeekdayMission){
        firstAdder = 5;
        secondAdder = 2;
    }
    else{
        firstAdder = 2;
        secondAdder = 5;
    }
    for(var j = 0; j < 3; j++){
        // Odd index elements in the array are either 2 or 5 days (in terms of day of week) after current mission's start date depending on whether current mission is the weekday mission. Even index elements are always the same day of week as current mission date.
        missionDates.push(currentMissionDate.add(firstAdder, "d").local().format("D MMM"));
        missionDates.push(currentMissionDate.add(secondAdder, "d").local().format("D MMM"));
    }

    // Working out the specialist type
    var specType = null;
    if(isWeekdayMission){
        specType = ["Themed", "Solo"]
    }
    else{
        specType = ["Solo", "Themed"]
    }
    
    for(var i = 0; i < 7; i++){
        var row = i + 1;
        $("#specNo" + row).html("#" + (currentMissionNo + i));
        $("#specDate" + row).html(missionDates[i]);
        $("#specMapType" + row).html(specialistsImport[i].mapType);
        $("#specMissionType" + row).html(specType[i % 2]);
    }
    */
}
