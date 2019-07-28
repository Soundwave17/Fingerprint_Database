$(document).ready(function () {

    $("#cart-nav").click(function () {
        $("#accordionSidebar li").removeClass("active");
        $("#active-link").addClass("active");
        $(this).closest("li").addClass(" active");
        $("#checkout-panel").removeClass("d-none");
        $("#checkout-panel").show();
        $("#purchase-panel").hide();

        $("#checkout-table-ul").html('');

        var products = {};
        var array = $(".selected");
        if (!array.length) {
            console.log("AAAAAAAAAA EMPTY");
        } else {
            console.log("Product list is not empty");
            array.each(function (index, value) {
                var temp = [];
                temp.push($(this).children("div.card")
                    .children("div.card-block")
                    .children("h4.card-title").text());
                temp.push($(this).children("div.card")
                    .children("div.card-footer")
                    .children("div.row.align-content-center")
                    .children("div.col-md-4")
                    .children("input.form-control").val());
                temp.push($(this).children("div.card")
                    .children("div.card-footer")
                    .children("div.row.align-content-center")
                    .children("div.col-md-6.text-center.my-auto")
                    .text());
                products[index] = temp;
            });
            console.log(products);
            for (var key in products) {
                $("#checkout-table-ul").append('<li class="list-group-item d-flex justify-content-between lh-condensed">\n' +
                    '                               <div>\n' +
                    '                                   <h6 class="my-0">' + products[key][0] + '</h6>\n' +
                    '                                   <small class="text-muted">' + products[key][1] + '</small>\n' +
                    '                               </div>\n' +
                    '                               <span class="text-muted">' + products[key][2] + '</span>\n' +
                    '                           </li>');
            }
            $("#checkout-table-ul").append('<li class="list-group-item d-flex justify-content-between">\n' +
                '                               <span>Total (USD)</span>\n' +
                '                               <strong>$20</strong>\n' +
                '                           </li>');
        }
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
            $(this).removeClass("selected");
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

    $("#checkout-btn").on("click", function () {

        $("#checkout-table-ul").empty();
        var products = {};
        var array = $(".selected");
        if (!array.length) {
            console.log("AAAAAAAAAA EMPTY");
        } else {
            console.log("Product list is not empty");
            array.each(function (index, value) {
                var temp = [];
                temp.push($(this).children("div.card")
                    .children("div.card-block")
                    .children("h4.card-title").text());
                temp.push($(this).children("div.card")
                    .children("div.card-footer")
                    .children("div.row.align-content-center")
                    .children("div.col-md-4")
                    .children("input.form-control").val());
                temp.push($(this).children("div.card")
                    .children("div.card-footer")
                    .children("div.row.align-content-center")
                    .children("div.col-md-6.text-center.my-auto")
                    .text());
                products[index] = temp;
            });
            console.log(products);
            var total=0;
            for (var key in products) {
                $("#checkout-table-ul").append('<li class="list-group-item d-flex justify-content-between lh-condensed">\n' +
                    '                               <div>\n' +
                    '                                   <h6 class="my-0">' + products[key][0] + '</h6>\n' +
                    '                                   <small class="text-muted"> x' + products[key][1] + '</small>\n' +
                    '                               </div>\n' +
                    '                               <span class="text-muted">' + products[key][2] + '</span>\n' +
                    '                           </li>');
                total=total + (parseFloat(products[key][2]) * parseFloat(products[key][1]));
            }
            $("#checkout-table-ul").append('<li class="list-group-item d-flex justify-content-between">\n' +
                '                               <span><strong>Total:</strong></span>\n' +
                '                               <strong>'+ total +' €</strong>\n' +
                '                           </li>');
        }
    });

});
