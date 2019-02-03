function dtSetup() {
    var table = $("#apexTable").dataTable({
        data: apexes,
        dom: "flrtip",
        buttons: [
            {
                text: "Reset",
                action: function (e, dt, node, config) {

                }
            }
        ],
        columns: [
            { data: "id" },
            { data: "ship" },
            {
                data: "imageName",
                render: function (data, type, row, meta) {
                    return '<img src="./Pics/' + data + '"/>'
                },
                orderable: false
            },
            { data: "rank" },
            { data: "apexName" },
            { data: "type" },
            { data: "description", searchable: false },
            { data: "cost" },
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
                orderable: false
            }
        ]
    })

    // Auto scroll to top of table when changing page
    $('#apexTable').on('page.dt', function () {
        $('html, body').animate({
            scrollTop: $('#apexTable').offset().top
        }, 200);
    });

    // Auto focus on search box as soon as page loads
    $("input[type=search]")[0].focus();

    // Adds the reset button beside the search box (not possible to achieve the intended outcome with datatables' options)
    $("input[type=search]").after('&nbsp;&nbsp;<button type="button" id="reset">Reset</button>')

    // Click event for reset button, empties the search box and triggers datatable to load
    $("#reset").click(function () {
        $("input[type=search]").val("").trigger("input");
    })
}