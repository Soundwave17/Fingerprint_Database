$(document).ready(function () {
    var csrftoken = '{% csrf_token %}';
    var message_ajax=$('#message-ajax');
    message_ajax.removeClass('d-none');
    message_ajax.hide();
    $('#retry').click(function (e) {
        e.preventDefault();
            $.ajax({
                    headers: {
                        "X-CSRFToken": csrftoken,
                    },
                    crossDomain: true,
                    url: 'http://192.168.1.42/match',
                    dataType: 'json',
                    type: 'GET',
                    success: function (result) {
                        console.log(result);
                        if (!result['response']) {
                            message_ajax.show();
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
                                        message_ajax.show();
                                        $("#message-ajax").addClass("text-success");
                                        $('#message-ajax').text(result['msg'] + " you will be returned to the page in 3 seconds.");

                                        setTimeout(function(){
                                            message_ajax.show();
                                            $('#message-ajax').text("Success! You'll be redirected in few moments!");
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
                                        }, 3000);



                                    } else if (!answer['success']) {
                                        message_ajax.show();
                                        $('#message-ajax').text("Your email is invalid, please return to login.");
                                    } else {
                                        message_ajax.show();
                                        $('#retry').text("Retry");

                                        $('#message-ajax').text("Your fingerprint is registered, but " +
                                            "it doesn't match the user's.");
                                    }
                                }

                            });
                        }
                    }
                    ,
                    error: function(err){
                        message_ajax.show();
                        $('#retry').text("Retry");

                        $('#message-ajax').text("Error! Sensor not found!");
                    },
                    timeout: 100000,
                }
            );
    })
    ;


    $('#abort').click(function (e) {
        e.preventDefault();
        window.history.back();
    });

})
;