$(document).ready(function () {
    var csrftoken = '{% csrf_token %}';
    var success = false;
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
                        if (!result['response']) {
                            $('#retry').text("Retry");
                            $('#message-ajax').text(result['msg']);
                        } else {
                            var found = false;
                            $.ajax({
                                headers: {"X-CSRFToken": csrftoken},
                                url: 'get_customer_id/',
                                dataType: 'json',
                                data: {
                                    "customer_email": $("#myVar").val(),
                                },
                                type: 'GET',
                                success: function (answer) {
                                    console.log(answer);
                                    if (answer['success'] && answer['id'] == result['id']) {
                                        found = true;
                                    }else if(!answer['success']){
                                        $('#message-ajax').text("Your email is invalid, please return to login.");
                                    }else{
                                        $('#retry').text("Retry");
                                        $('#message-ajax').text("Your fingerprint is regsitered, but " +
                                            "it doesn't match the user's.");
                                    }
                                }
                            });
                            if (found) {
                                $('#message-ajax').text(result['msg']);
                                $('#retry').text("Continue");
                                success = true;
                            }
                        }
                    },
                    timeout: 100000,
                }
            );

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
            });
        }

    })
    ;


    $('#abort').click(function (e) {
        e.preventDefault();
        window.history.back();
    });

})
;