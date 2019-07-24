var csrftoken = '{% csrf_token %}';
var first = true;
var success = false;
$(document).ready(function () {

    $('#retry').click(function (e) {
        e.preventDefault();
        if (!success) {
            $.ajax({
                headers: {
                    "X-CSRFToken": csrftoken,
                },
                crossDomain: true,
                url: 'http://192.168.1.42/match',
                dataType: 'json',
                type: 'GET',
                success: function (result) {
                    if (!result['response'] && first) {
                        first = false;
                        $('#message-ajax').text(result['msg']);
                    } else {
                        $('#message-ajax').text(result['msg']);
                        $('#retry').text("Continue");
                        success = true;

                    }
                },
            });

            if (!first) {
                $('#retry').text("Retry");
            }
        } else {
            console.log("okkke");
            $.ajax({
                headers: {"X-CSRFToken": csrftoken},
                url: 'customer_exists/',
                dataType: 'json',
                data: {
                    "customer_email": $("#myVar").val(),
                },
                type: 'GET',
                success: function (result) {
                    console.log(result);
                    if (result['success']) {
                        if (result['admin']) {
                            window.location = window.location.pathname + "overview/";
                        } else {
                            window.location = window.location.pathname + "purchase/";
                        }
                    }
                }
            })
        }

    });


    $('#abort').click(function (e) {
        e.preventDefault();
        window.history.back();
    });

});