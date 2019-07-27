$(document).ready(function () {
    cardWrapper = $('.border.col-md-3.p-1.m-1');
    var csrftoken = '{% csrf_token %}';
    var success = false;

    cardWrapper.on("hover", function () {
      $(this).addClass("border-danger");
    });

    cardWrapper.hover(
        function() { if(!$(this).hasClass("border-primary")){$(this).addClass("border-danger");} },
        function() { $(this).removeClass("border-danger")});

    cardWrapper.on('click', function () {
        if ($(this).hasClass('border-primary')) {
            $(this).css("opacity", "1.0");
            $(this).removeClass('border-primary');
        } else {
            $(this).css("opacity", "0.5");
            $(this).addClass('border-primary');
        }
    });
});