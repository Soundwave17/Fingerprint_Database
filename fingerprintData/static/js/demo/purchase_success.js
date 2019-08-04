$(document).ready(function () {
    $('#warning-checkout-modal').modal({ show: false});
    var limitFunc = function(){
        if (window.innerWidth<425){
            $("#accordionSidebar").hide();
        };
        if (window.innerWidth>425){
           $("#accordionSidebar").show();
        };

    };
    if (window.innerWidth<425){
            $("#accordionSidebar").hide();
        };
    window.addEventListener("resize", limitFunc);
    var nav_counter = $("#nav-cart-counter");
    var btn_counter = $("#checkout-cart-counter");
    $(".check-image").hide();
    $("#fingerprint-modal").hide();


});