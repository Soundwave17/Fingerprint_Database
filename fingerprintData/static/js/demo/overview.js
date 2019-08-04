// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';


function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

//validates year
function yearValidationPie(year) {

    var error_div = $("#error-pie-div");
    var error_msg = $("#error-pie-msg");

    var text = /^[0-9]+$/;

    if(year=='None'){
        error_div.show();
        error_msg.html("Please enter a valid year.");
        return false;
    }

    if (year != 0) {
        if ((year != "") && (!text.test(year))) {
            error_div.show();
            error_msg.html("Please enter numeric values only.");
            return false;
        }

        if (year.length != 4) {
            error_div.show();
            error_msg.html("Please enter a 4 digit number.");
            return false;
        }
        var current_year = new Date().getFullYear();
        if ((year < 1920) || (year > current_year)) {
            error_div.show();
            error_msg.html("Year should be in range 1920 to current year");
            return false;
        }
        return true;
    }
    error_div.show();
    error_msg.html("Please enter a 4 digit number.");
    return false;
}


function yearValidationLine(year) {

    var error_div = $("#error-div");
    var error_msg = $("#error-msg");

    var text = /^[0-9]+$/;
    if (year != 0) {
        if ((year != "") && (!text.test(year))) {
            error_div.show();
            error_msg.html("Please enter a valid year.");
            return false;
        }

        if (year.length != 4) {
            error_div.show();
            error_msg.html("Please enter a 4 digit number.");
            return false;
        }
        var current_year = new Date().getFullYear();
        if ((year < 1920) || (year > current_year)) {
            error_div.show();
            error_msg.html("Year should be in range 1920 to current year");
            return false;
        }
        return true;
    }
    error_div.show();
    error_msg.html("Please enter a 4 digit number.");
    return false;
}

//download pdf from canvas
function downloadPDF() {
    var canvas = document.querySelector('#myAreaChart');
    //creates image
    var canvasImg = canvas.toDataURL("image/jpeg", 1.0);

    //creates PDF from img
    var doc = new jsPDF('landscape');
    doc.setFontSize(20);
    doc.text(15, 15, "Cool Chart");
    doc.addImage(canvasImg, 'JPEG', 10, 10, 280, 150);
    doc.save('canvas.pdf');
}

function downloadPiePDF() {
    var canvas = document.querySelector('#myPieChart');
    //creates image
    var canvasImg = canvas.toDataURL("image/jpeg", 1.0);

    //creates PDF from img
    var doc = new jsPDF('landscape');
    doc.setFontSize(20);
    doc.text(15, 15, "Cool Chart");
    doc.addImage(canvasImg, 'JPEG', 10, 10, 280, 150);
    doc.save('canvas.pdf');
}


function setupPieChartPage() {
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
            legend: {
                display: false
            },
            cutoutPercentage: 80,
        },
    });


    return myPieChart;
}


function setupChartPage() {
    var ctx = document.getElementById("myAreaChart");
    var sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: "Revenue",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: [sum[0], sum[1], sum[2], sum[3], sum[4], sum[5], sum[6], sum[7], sum[8], sum[9], sum[10], sum[11]],
            }],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 7
                    }
                }],
                yAxes: [{
                    ticks: {
                        maxTicksLimit: 5,
                        padding: 10,
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return '$' + number_format(value);
                        }
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                mode: 'index',
                caretPadding: 10,
                callbacks: {
                    label: function (tooltipItem, chart) {
                        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
                    }
                }
            }
        }
    });

    return myLineChart;
}

// Area Chart Example
$(document).ready(function () {

    $("#rotate-modal").modal({show: false});

    if (window.innerWidth<350){
            $("#rotate-modal").modal('show');
        }

     var limitFunc = function(){
        if (window.innerWidth<350){
            $("#rotate-modal").modal('show');
        }
        if (window.innerWidth>350){
           $("#rotate-modal").modal('hide');
        }
    };

    window.addEventListener("resize", limitFunc);


    $("#error-div").removeClass("d-none");
    $("#error-div").hide();
    var csrftoken = '{% csrf_token %}';
    var sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var myLineChart = setupChartPage();
    var myPieChart = setupPieChartPage();
    var sumType = [];


    $.ajax({
        headers: {
            "X-CSRFToken": csrftoken,
        },
        crossDomain: true,
        url: 'get_revenue_by_type/',
        dataType: 'json',
        type: 'GET',
        data: {"year": $('#year-pie-input').val(), "customer": $('#customer-pie-input').val()},
        success: function (result) {
            var types = result['types'];
            var labels = Object.keys(types);
            var data1 = result['data'];

            myPieChart.data = {
                labels: labels,
                datasets: [{
                    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",

                    data: data1,
                }]
            };
            myPieChart.update();

        },
    });

    $.ajax({
        headers: {
            "X-CSRFToken": csrftoken,
        },
        crossDomain: true,
        url: 'http://192.168.1.42/getNum',
        dataType: 'json',
        type: 'GET',
        success: function (result) {
            if (result['response']) {
                $("#templates-number").text(result['id']);
            } else {
                $("#templates-number").text(result['msg']);
            }
        },
        error: function (err) {
            $("#finger-count-p").html("Error! Sensor not found!");
        }
    });


    $("#load-pie-graph").click(function () {
        var error_div = $("#error-pie-div");
        error_div.removeClass("d-none");
        error_div.hide();
        if (yearValidationPie($('#year-pie-input').val())) {
            $.ajax({
                headers: {
                    "X-CSRFToken": csrftoken,
                },
                crossDomain: true,
                url: 'get_revenue_by_type/',
                dataType: 'json',
                type: 'GET',
                data: {"year": $('#year-pie-input').val(), "customer": $('#customer-pie-input').val()},
                success: function (result) {
                    var types = result['types'];
                    var labels = Object.keys(types);
                    var data1 = result['data'];

                    myPieChart.data = {
                        labels: labels,
                        datasets: [{
                            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                            hoverBorderColor: "rgba(234, 236, 244, 1)",

                            data: data1,
                        }]
                    };
                    myPieChart.update();

                },
            });
        }
    });

    $("#sensor-control").click(function () {
        $("#accordionSidebar li").removeClass("active");
        $("#active-link").addClass("active");
        $(this).closest("li").addClass(" active");
        $("#sensor-control-wrapper").removeClass("d-none");
        $("#sensor-control-wrapper").fadeIn('slow');
        $("#graph-wrapper").hide();
        $("#nav-tab").hide();
    });

    $("#graphs").click(function () {
        $("#accordionSidebar li").removeClass("active");
        $("#active-link").addClass("active");
        $(this).closest("li").addClass(" active");
        $("#graph-wrapper").fadeIn('slow');
        $("#nav-tab").fadeIn('slow');
        $("#sensor-control-wrapper").hide();
    });

    $("#load-graph").click(function () {
        var year = $("#year-input").val();
        var type = $("#type-input").val();
        var product = $("#product-input").val();
        var customer = $("#customer-input").val();
        var customer_2 = $("#customer-input-2").val();
        var customer_3 = $("#customer-input-3").val();
        var error_div = $("#error-div");
        error_div.hide();
        if (year) {
            if (yearValidationLine(year)) {
                $.ajax({
                    headers: {"X-CSRFToken": csrftoken},
                    url: 'get_revenue_by_year/',
                    dataType: 'json',
                    data: {"year": year, "type": type, "product": product, "customer": customer},
                    type: 'GET',
                    success: function (result) {
                        console.log(result);
                        sum[0] = result['Jan'];
                        sum[1] = result['Feb'];
                        sum[2] = result['Mar'];
                        sum[3] = result['Apr'];
                        sum[4] = result['May'];
                        sum[5] = result['Jun'];
                        sum[6] = result['Jul'];
                        sum[7] = result['Aug'];
                        sum[8] = result['Sep'];
                        sum[9] = result['Oct'];
                        sum[10] = result['Nov'];
                        sum[11] = result['Dec'];
                        myLineChart.data = {
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                            datasets: [{
                                label: "Revenue 1",
                                lineTension: 0.3,
                                backgroundColor: "rgba(78,115,223,0.17)",
                                borderColor: "rgba(78, 115, 223, 1)",
                                pointRadius: 3,
                                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                                pointBorderColor: "rgba(78, 115, 223, 1)",
                                pointHoverRadius: 3,
                                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                                pointHitRadius: 10,
                                pointBorderWidth: 2,
                                data: [sum[0], sum[1], sum[2], sum[3], sum[4], sum[5], sum[6], sum[7], sum[8], sum[9], sum[10], sum[11]],
                            }]
                        };
                        myLineChart.update();

                        //second ajax
                        if (customer_2 != "Nothing") {
                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                                url: 'get_revenue_by_year/',
                                dataType: 'json',
                                data: {"year": year, "type": type, "product": product, "customer": customer_2},
                                type: 'GET',
                                success: function (result_2) {
                                    sum[0] = result_2['Jan'];
                                    sum[1] = result_2['Feb'];
                                    sum[2] = result_2['Mar'];
                                    sum[3] = result_2['Apr'];
                                    sum[4] = result_2['May'];
                                    sum[5] = result_2['Jun'];
                                    sum[6] = result_2['Jul'];
                                    sum[7] = result_2['Aug'];
                                    sum[8] = result_2['Sep'];
                                    sum[9] = result_2['Oct'];
                                    sum[10] = result_2['Nov'];
                                    sum[11] = result_2['Dec'];
                                    myLineChart.data.datasets.push({
                                        label: "Revenue 2",
                                        lineTension: 0.3,
                                        backgroundColor: "rgba(223,5,0,0.31)",
                                        borderColor: "rgb(223,5,0)",
                                        pointRadius: 3,
                                        pointBackgroundColor: "rgb(223,9,0)",
                                        pointBorderColor: "rgb(223,0,12)",
                                        pointHoverRadius: 3,
                                        pointHoverBackgroundColor: "rgb(223,0,37)",
                                        pointHoverBorderColor: "rgb(223,0,5)",
                                        pointHitRadius: 10,
                                        pointBorderWidth: 2,
                                        data: [sum[0], sum[1], sum[2], sum[3], sum[4], sum[5], sum[6], sum[7], sum[8], sum[9], sum[10], sum[11]],
                                    });
                                    myLineChart.update();

                                    //third ajax
                                    if (customer_3 != "Nothing") {
                                        $.ajax({
                                            headers: {"X-CSRFToken": csrftoken},
                                            url: 'get_revenue_by_year/',
                                            dataType: 'json',
                                            data: {
                                                "year": year,
                                                "type": type,
                                                "product": product,
                                                "customer": customer_3
                                            },
                                            type: 'GET',
                                            success: function (result_3) {
                                                sum[0] = result_3['Jan'];
                                                sum[1] = result_3['Feb'];
                                                sum[2] = result_3['Mar'];
                                                sum[3] = result_3['Apr'];
                                                sum[4] = result_3['May'];
                                                sum[5] = result_3['Jun'];
                                                sum[6] = result_3['Jul'];
                                                sum[7] = result_3['Aug'];
                                                sum[8] = result_3['Sep'];
                                                sum[9] = result_3['Oct'];
                                                sum[10] = result_3['Nov'];
                                                sum[11] = result_3['Dec'];
                                                myLineChart.data.datasets.push({
                                                    label: "Revenue 3",
                                                    lineTension: 0.3,
                                                    backgroundColor: "rgba(2,223,0,0.19)",
                                                    borderColor: "rgb(2,223,0)",
                                                    pointRadius: 3,
                                                    pointBackgroundColor: "rgb(8,223,5)",
                                                    pointBorderColor: "rgb(2,223,0)",
                                                    pointHoverRadius: 3,
                                                    pointHoverBackgroundColor: "rgb(2,223,0)",
                                                    pointHoverBorderColor: "rgb(2,223,0)",
                                                    pointHitRadius: 10,
                                                    pointBorderWidth: 2,
                                                    data: [sum[0], sum[1], sum[2], sum[3], sum[4], sum[5], sum[6], sum[7], sum[8], sum[9], sum[10], sum[11]],
                                                });
                                                myLineChart.update();
                                            }
                                        });
                                    }
                                }
                            });
                        } else if (customer_3 != "Nothing") {
                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                                url: 'get_revenue_by_year/',
                                dataType: 'json',
                                data: {
                                    "year": year,
                                    "type": type,
                                    "product": product,
                                    "customer": customer_3
                                },
                                type: 'GET',
                                success: function (result_3) {
                                    sum[0] = result_3['Jan'];
                                    sum[1] = result_3['Feb'];
                                    sum[2] = result_3['Mar'];
                                    sum[3] = result_3['Apr'];
                                    sum[4] = result_3['May'];
                                    sum[5] = result_3['Jun'];
                                    sum[6] = result_3['Jul'];
                                    sum[7] = result_3['Aug'];
                                    sum[8] = result_3['Sep'];
                                    sum[9] = result_3['Oct'];
                                    sum[10] = result_3['Nov'];
                                    sum[11] = result_3['Dec'];
                                    myLineChart.data.datasets.push({
                                        label: "Revenue 3",
                                        lineTension: 0.3,
                                        backgroundColor: "rgba(2,223,0,0.19)",
                                        borderColor: "rgb(2,223,0)",
                                        pointRadius: 3,
                                        pointBackgroundColor: "rgb(8,223,5)",
                                        pointBorderColor: "rgb(2,223,0)",
                                        pointHoverRadius: 3,
                                        pointHoverBackgroundColor: "rgb(2,223,0)",
                                        pointHoverBorderColor: "rgb(2,223,0)",
                                        pointHitRadius: 10,
                                        pointBorderWidth: 2,
                                        data: [sum[0], sum[1], sum[2], sum[3], sum[4], sum[5], sum[6], sum[7], sum[8], sum[9], sum[10], sum[11]],
                                    });
                                    myLineChart.update();
                                }
                            });
                        }
                    }
                });
            }
        } else {
            error_div.show();
            $("#error-msg").html("You must input something!");
            myLineChart.data = {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "Revenue",
                    lineTension: 0.3,
                    backgroundColor: "rgba(78, 115, 223, 0.05)",
                    borderColor: "rgba(78, 115, 223, 1)",
                    pointRadius: 3,
                    pointBackgroundColor: "rgba(78, 115, 223, 1)",
                    pointBorderColor: "rgba(78, 115, 223, 1)",
                    pointHoverRadius: 3,
                    pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                    pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                    pointHitRadius: 10,
                    pointBorderWidth: 2,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                }]
            };
            myLineChart.update();
        }
    });


    //add event listener to button
    $("#download-pdf").click(downloadPDF);
    $("#download-pie-pdf").click(downloadPiePDF);


    var products = [];

    $("#type-input").change(function () {
        $.ajax({
            headers: {
                "X-CSRFToken": csrftoken,
            },

            url: 'get_product_by_type/',
            dataType: 'json',
            type: 'GET',
            data: {"type": $("#type-input").val()},
            success: function (result) {
                products = result['products'];
                console.log(products);

                $("#product-input").empty();
                var o = new Option("Nothing", "Nothing");
                $(o).html("Nothing");
                $("#product-input").append(o);

                for (pr in products) {
                    o = new Option(products[pr], products[pr]);
                    /// jquerify the DOM object 'o' so we can use the html method
                    $(o).html(products[pr]);
                    $("#product-input").append(o);
                }
            },
        });
    });

    $("#customer-input").change(function () {
        if ($(this).val() != "Nothing") {
            $("#customer-div-2").removeClass("d-none");
            $("#customer-div-2").show();
        } else {

        }
    });

    $("#customer-input-2").change(function () {
        if ($(this).val() != "Nothing") {
            $("#customer-div-3").removeClass("d-none");
            $("#customer-div-3").show();
        }
    });

    $("#modal-delete-close").on("click", function () {
        $("#modal-delete-error-div").hide();
    });

});