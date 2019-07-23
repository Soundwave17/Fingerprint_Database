// add this to every ajaxSETUP call : xhr.setRequestHeader("X-CSRFToken", csrftoken);
// add this to every ajax call attributes : headers: { "X-CSRFToken": token },

$(document).ready(function () {
    var csrftoken = '{% csrf_token %}';

    $('#customer-access-form').on('submit', function (e) {
        e.preventDefault();
        console.log($(this).val());
        var form = $(this).closest("form");
        $.ajax({
            headers: {"X-CSRFToken": csrftoken},
            url: 'customer_login/',
            dataType: 'json',
            data: {"customer_email": $("#customer-email").val(), "customer_password": $("#customer-password").val()},
            type: 'GET',
            success: function (result) {
                console.log(result)
                if (result['success']) {
                    window.location = window.location.pathname + $("#customer-email").val() + "/fingerprint_access/";
                }
            }
        });
    });
});