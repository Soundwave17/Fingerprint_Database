$(document).ready(function () {
    $(".check-image").hide();
    var card_wrapper = $(".border.col-md-3.p-1.m-1");
    card_wrapper.hover(
        function () {
            if (!$(this).hasClass("border-primary")) {
                $(this).addClass("border-danger");
            }
        },
        function () {
            $(this).removeClass("border-danger");
        });
    card_wrapper.on('click', function () {
        if ($(this).hasClass('border-primary')) {
            $(this).css("opacity", "1.0");
            $(this).removeClass('border-primary');
            $(this).remove("selected");
            $(this).children("div.card")
                .children("div.card-footer")
                .children("span.float-sm-left")
                .children("img.check-image").hide();
        } else {
            $(this).css("opacity", "0.5");
            $(this).addClass('border-primary');
            $(this).addClass('selected');
            $(this).children("div.card")
                .children("div.card-footer")
                .children("span.float-sm-left")
                .children("img.check-image").show()
        }
    });
});
