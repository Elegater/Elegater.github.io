function dtSetup(smallScreen) {
    var table = buildDatatable(smallScreen);

    // Auto scroll to top of table when changing page
    $('#apexTable').on('page.dt', function () {
        $('html, body').animate({
            scrollTop: $('#apexTable').offset().top
        }, 200);
    });

    // Auto focus on search box as soon as page loads
    $("input[type=search]")[0].focus();
    // Resets viewport position at top of screen after focusing on search box when loading in
    $("body")[0].scrollIntoView();

    // Adds the reset button beside the search box (not possible to achieve the intended outcome with datatables' options)
    $("input[type=search]").after('&nbsp;&nbsp;<button type="button" id="reset">Reset</button>')

    // Click event for reset button, empties the search box and triggers datatable to load
    $("#reset").click(function () {
        $("input[type=search]").val("").trigger("input");
    })
}

function buildDatatable(smallScreen) {
    var table = $("#apexTable").dataTable({
        data: apexes,
        dom: "flrtip",
        order: [7, "asc"],
        columns: [
            {
                data: "ship",
                render: function (data, type, row, meta){
                    // console.log(row);
                    return "<span>" + row.ship + " (" + row.rank + ")</span>";
                },
                responsivePriority: 1
            },
            {
                data: "imageName",
                render: function (data, type, row, meta) {
                    return '<img src="./Pics/' + data + '"/>'
                },
                orderable: false,
                responsivePriority: 2
            },
            { data: "rank" },
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