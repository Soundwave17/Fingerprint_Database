$(document).ready(function () {
    var csrftoken = '{% csrf_token %}';

    $('#customer-register-form').on('submit', function (e) {
        e.preventDefault();
        console.log($(this).val());
        var form = $(this).closest("form");
        $.ajax({
            headers: {"X-CSRFToken": csrftoken},
            url: 'create_customer/',
            dataType: 'json',
            data: {
                "customer_email": $("#customer-email").val(),
                "customer_name": $("#customer-name").val(),
                "customer_surname": $("#customer-surname").val(),
                "customer_password": $("#customer-password").val(),
                "csrfmiddlewaretoken": "{{ csrf_token }}"
            },
            type: 'POST',
            success: function (result) {
                console.log(result);
                var data = JSON.stringify(result);
                console.log(data.msg);
            }
        });
    });
});