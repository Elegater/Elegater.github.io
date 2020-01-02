function dtSetup(smallScreen) {
    var table = buildDatatable(smallScreen);

    // Auto scroll to top of table when changing page
    $('#apexTable').on('page.dt', function () {
        scrollToTable();
    });

    // Auto focus on search box as soon as page loads
    $("input[type=search]")[0].focus();
    // Resets viewport position to top of screen after focusing on search box when loading in
    $("body")[0].scrollIntoView();

    // Giving the DataTables search box an id so it can be easily found elsewhere
    $("input[type=search]").attr("id", "searchBox");

    // Adds the reset button beside the search box (not possible to achieve the intended outcome with datatables' options)
    // Adds event handler to scroll to the table when pressing enter / return in the search box
    var searchBox = $("#searchBox");
    searchBox
        .after('&nbsp;&nbsp;<button type="button" id="reset">Reset</button>')
        .on("keypress", function (e) {
            if (e.keyCode === 13) {
                searchBox.blur();
                scrollToTable();
            }
        });

    setUpAdvancedSearch(table);

    // Click event for reset button, empties the search box and triggers datatable to load
    $("#reset").click(function () {
        resetSearch();
    })
}

function buildDatatable(smallScreen) {
    var resp = smallScreen ?   // Likely to be dropped
        true :
        {
            details: {
                display: $.fn.dataTable.Responsive.display.modal({
                    header: function (row) {
                        var data = row.data();
                        return data.ship + " (" + data.rank + ")";
                    }
                })
            }
        };

    var table = $("#apexTable").DataTable({
        data: apexes,
        dom: '<"#filterArea"f>lrtip',
        order: [6, "asc"],
        lengthMenu: [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
        columns: [
            {
                data: "ship",
                render: function (data, type, row, meta) {
                    return "<span>" + row.ship + "<br>(" + row.rank + ")</span>";
                },
                responsivePriority: 1
            },
            {
                data: "imageName",
                render: function (data, type, row, meta) {
                    return '<div style="text-align: center; width:140px;"><img class="apexImg" src="./Pics/' + data + '"/></div>'
                },
                orderable: false,
                responsivePriority: 2
            },
            { data: "apexName" },
            { data: "type" },
            { data: "description", searchable: false },
            { data: "cost" },
            { data: "id" },
            { data: "dps" },
            { data: "mainType" },
            { data: "aura" },
            { data: "zen" },
            {
                data: "video",
                render: function (data, type, row, meta) {
                    if (data !== "") {
                        return "<a href='" + data + "'>Video</a>"
                    }
                    else {
                        return "<span>No video available</span>"
                    }
                },
                orderable: false,
                responsivePriority: 3
            }
        ],
        responsive: smallScreen
    });
    
    return table;
}

function setUpAdvancedSearch(table){
    // Removing float property from the default search box to set up the Advanced Search collapsible
    $("#apexTable_filter").css("float", "none");
    $("#filterArea").css("text-align", "right");
    $("#apexTable_filter").after("<div id='advancedSearch'></div>");
    $("#advancedSearch").css("text-align", "right");
    $("#advancedSearch").append('<button id="advancedSearchBtn" class="btn btn-link" data-toggle="collapse" data-target="#advancedSearchOptions" style="font-weight:bold;">Advanced Search</button>');
    $("#advancedSearch").append("<div class='collapse' id='advancedSearchOptions'></div>");

    // Creating Main Weapon Type drop down list
    $("#advancedSearchOptions").append("<div style='padding:5px 0px'>Main Type: <select class='advSearch' id='main'></select></div>");
    $("select#main").append("<option value=''>Any</option>");
    $("select#main").append("<option value='Armor Piercing'>Armor Piercing</option>");
    $("select#main").append("<option value='Shield Breaker'>Shield Breaker</option>");
    $("select#main").append("<option value='High Impact'>High Impact</option>");

    // Creating Aura drop down list
    $("#advancedSearchOptions").append("<div style='padding:5px 0px'>Aura: <select class='advSearch' id='aura'></select></div>");
    $("select#aura").append("<option value=''>Any</option>");
    $("select#aura").append("<option value='Barrier'>Barrier</option>");
    $("select#aura").append("<option value='Blade Storm'>Blade Storm</option>");
    $("select#aura").append("<option value='Bullet EMP'>Bullet EMP</option>");
    $("select#aura").append("<option value='Chrono Field'>Chrono Field</option>");
    $("select#aura").append("<option value='Goliath Missile'>Goliath Missile</option>");
    $("select#aura").append("<option value='Ion Cannon'>Ion Cannon</option>");
    $("select#aura").append("<option value='Laser Storm'>Laser Storm</option>");
    $("select#aura").append("<option value='Missile Swarm'>Missile Swarm</option>");
    $("select#aura").append("<option value='Phalanx'>Phalanx</option>");
    $("select#aura").append("<option value='Point Defense'>Point Defense</option>");
    $("select#aura").append("<option value='Stun EMP'>Stun EMP</option>");
    $("select#aura").append("<option value='Vorpal Lance'>Vorpal Lance</option>");
    
    // Creating Zen drop down list
    $("#advancedSearchOptions").append("<div style='padding:5px 0px'>Zen: <select class='advSearch' id='zen'></select></div>");
    $("select#zen").append("<option value=''>Any</option>");
    $("select#zen").append("<option value='Focus Lance'>Focus Lance</option>");
    $("select#zen").append("<option value='Kappa Drive'>Kappa Drive</option>");
    $("select#zen").append("<option value='Mega Laser'>Mega Laser</option>");
    $("select#zen").append("<option value='Mega Bomb'>Mega Bomb</option>");
    $("select#zen").append("<option value='Personal Shield'>Personal Shield</option>");
    $("select#zen").append("<option value='Reflex EMP'>Reflex EMP</option>");
    $("select#zen").append("<option value='Teleport'>Teleport</option>");
    $("select#zen").append("<option value='Tracking Minigun'>Tracking Minigun</option>");
    $("select#zen").append("<option value='Trinity Teleport'>Trinity Teleport</option>");

    // Creating Apex Rank drop down list
    $("#advancedSearchOptions").append("<div style='padding:5px 0px 10px 0px'>Apex Rank: <select class='advSearch' id='rank'></select><br/></div>");
    $("select#rank").append("<option value=''>Any</option>");
    $("select#rank").append("<option value='Alpha'>Alpha</option>");
    $("select#rank").append("<option value='Beta'>Beta</option>");
    $("select#rank").append("<option value='Gamma'>Gamma</option>");
    $("select#rank").append("<option value='Delta'>Delta</option>");
    $("select#rank").append("<option value='Epsilon'>Epsilon</option>");
    $("select#rank").append("<option value='Lambda'>Lambda</option>");
    $("select#rank").append("<option value='Sigma'>Sigma</option>");
    $("select#rank").append("<option value='Tau'>Tau</option>");
    $("select#rank").append("<option value='Phi'>Phi</option>");
    $("select#rank").append("<option value='Omega'>Omega</option>");

    // Setting up the drop down lists' search function
    $("select.advSearch").change(function(){        
        table
        .columns(8)
        .search($("select#main").val())
        .columns(9)
        .search($("select#aura").val())
        .columns(10)
        .search($("select#zen").val())
        .columns(0)
        .search($("select#rank").val())
        .draw();
    });
}

function scrollToTable() {
    $('html, body').animate({
        scrollTop: $('#apexTable').offset().top
    }, 200);
}

function resetSearch(){
    // Reset advanced search fields
    $("select.advSearch").val("");
    $("#apexTable").dataTable().api().columns().search("").draw();
    // Reset search box
    $("#searchBox")
        .val("")
        .trigger("input")
        .focus();
}