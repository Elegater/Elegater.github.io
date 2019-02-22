function dtSetup(smallScreen) {
    var table = buildDatatable(smallScreen);

    // Auto scroll to top of table when changing page
    $('#apexTable').on('page.dt', function () {
        scrollToTable();
    });

    // Auto focus on search box as soon as page loads
    $("input[type=search]")[0].focus();
    // Resets viewport position at top of screen after focusing on search box when loading in
    $("body")[0].scrollIntoView();

    // Adds the reset button beside the search box (not possible to achieve the intended outcome with datatables' options)
    var searchBox = $("input[type=search]");
    searchBox
    .after('&nbsp;&nbsp;<button type="button" id="reset">Reset</button>')
    .on("keypress", function(e){
        if(e.keyCode === 13){
            searchBox.blur();
            scrollToTable();
        }
    });

    // Click event for reset button, empties the search box and triggers datatable to load
    $("#reset").click(function () {
        searchBox
        .val("")
        .trigger("input")
        .focus();
    })
}

function buildDatatable(smallScreen) {
    var table = $("#apexTable").dataTable({
        data: apexes,
        dom: "flrtip",
        order: [6, "asc"],
        columns: [
            {
                data: "ship",
                render: function (data, type, row, meta){
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

function scrollToTable(){
    $('html, body').animate({
        scrollTop: $('#apexTable').offset().top
    }, 200);
}