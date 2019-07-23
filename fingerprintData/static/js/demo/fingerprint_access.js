var csrftoken = '{% csrf_token %}';
var first = true;
var success = false;
$(document).ready(function () {

    $('#retry').click(function (e) {
            e.preventDefault();
            if(!success){
                $.ajax({
                 headers: {
                     "X-CSRFToken": csrftoken,
                 },
                 crossDomain: true,
                 url: 'http://192.168.1.42/match',
                 dataType: 'json',
                 type: 'GET',
                 success: function (result) {
                     if(!result['response'] && first)
                     {
                        first = false;
                        $('#message-ajax').text(result['msg']);
                     }
                     else{
                        $('#message-ajax').text(result['msg']);
                        $('#retry').text("Continue");
                        success = true;

                     }
                 },
            });
            if(!first){
                $('#retry').text("Retry");
            }
            }else{
                console.log("okkke");
            }

    });




    $('#abort').click(function (e) {
            e.preventDefault();
            $.ajax({
                 headers: {
                      "X-CSRFToken": csrftoken,
                 },
                 crossDomain: true,
                 url: 'http://192.168.1.42/42',
                 dataType: 'json',
                 type: 'GET',
                 success: function (result) {
                     console.log('ciao');
                     console.log(result);
                 },
            });
    });

});