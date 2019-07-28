$(document).ready(function () {

    $("#cart-nav").click(function () {
        $("#accordionSidebar li").removeClass("active");
        $("#active-link").addClass("active");
        $(this).closest("li").addClass(" active");
        $("#checkout-panel").removeClass("d-none");
        $("#checkout-panel").show();
        $("#purchase-panel").hide();
    });

    $("#checkout-btn").click(function () {
        $("#accordionSidebar li").removeClass("active");
        $("#active-link").addClass("active");
        $("#cart-nav").closest("li").addClass(" active");
        $("#checkout-panel").removeClass("d-none");
        $("#checkout-panel").show();
        $("#purchase-panel").hide();
    });

    $("#products-nav").click(function () {
        $("#accordionSidebar li").removeClass("active");
        $("#active-link").addClass("active");
        $(this).closest("li").addClass(" active");
        $("#purchase-panel").show();
        $("#checkout-panel").hide();
    });

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
            $(this).removeClass('border-primary');
            $(this).remove("selected");
            $(this).children("div.card")
                .children("div.card-footer")
                .children("div.row.align-content-center")
                .children("div.col-md-2.float-sm-left")
                .children("img.check-image").hide();
        } else {
            $(this).addClass('border-primary');
            $(this).addClass('selected');
            $(this).children("div.card")
                .children("div.card-footer")
                .children("div.row.align-content-center")
                .children("div.col-md-2.float-sm-left")
                .children("img.check-image").show()
        }
    });

    $("#empty-cart").on("click", function () {
        card_wrapper.each(function (index, value) {
            if ($(this).hasClass('border-primary')) {
                $(this).removeClass('border-primary');
                $(this).remove("selected");
                $(this).children("div.card")
                    .children("div.card-footer")
                    .children("div.row.align-content-center")
                    .children("div.col-md-2.float-sm-left")
                    .children("img.check-image").hide();
            }
        });
    });

});
