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
function yearValidation(year) {

    var error_div = $("#error-div");
    var error_msg = $("#error-msg");

    var text = /^[0-9]+$/;
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
        $("#error-div").hide();
        var csrftoken = '{% csrf_token %}';
        var sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var myLineChart = setupChartPage();

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
        });


        //$("#modal-delete").click(function(){
        //
        //});

        //$("#modal-delete-all").click(function(){
        // add esp32 response
        //});

        $("#sensor-control").click(function () {
            $("#accordionSidebar li").removeClass("active");
            $("#active-link").addClass("active");
            $(this).closest("li").addClass(" active");
            $("#sensor-control-wrapper").removeClass("d-none");
            $("#sensor-control-wrapper").show();
            $("#graph-wrapper").hide();
        });

        $("#graphs").click(function () {
            $("#accordionSidebar li").removeClass("active");
            $("#active-link").addClass("active");
            $(this).closest("li").addClass(" active");
            $("#graph-wrapper").show();
            $("#sensor-control-wrapper").hide();
        });

        $("#load-graph").click(function () {
            var year = $("#year-input").val();
            var error_div = $("#error-div");
            error_div.hide();
            if (year) {
                if (yearValidation(year)) {
                    $.ajax({
                        headers: {"X-CSRFToken": csrftoken},
                        url: 'get_revenue_by_year/',
                        dataType: 'json',
                        data: {"year": year},
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
                                }]
                            };
                            myLineChart.update();
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
    }
);

