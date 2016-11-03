/*-------------------Maps----------------------------------*/
function initMap() {
    var positionMap = {
        lat: 47.022440
        , lng: 28.825504
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16
        , center: positionMap
        , scrollwheel: false
        , mapTypeControl: true
        , zoomControl: true
        , zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        }
    , });
    var marker = new google.maps.Marker({
        position: {
            lat: 47.022440
            , lng: 28.823504
        }
        , map: map
        , title: 'Oficiul nostru'
        , animation: google.maps.Animation.BOUNCE
    , });
    google.maps.event.addDomListener(window, "resize", function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });
}
$(document).ready(function () {
    /*--------------------Gallery-pop-up--------------------------*/
    // When the user clicks the button, open the modal
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    var menu = document.getElementsByTagName("nav")[0];
    open_gallery = function (param) {
        modal.style.display = "block";
        menu.style.display = "none";
        document.documentElement.style.overflow = 'hidden';
        var dir = "resources\\img\\poze_mobilier\\" + param;
        var fileextension = ".jpg";
        var contor = 0;
        var container = "";
        $.ajax({
            //This will retrieve the contents of the folder if the folder is configured as 'browsable'
            url: dir
            , success: function (data) {
                var total = $(data).find("a").length;
                $(data).find("a").attr("href", function (i, val) {
                    if (val.match(/\.(jpe?g|png|gif|bmp|JPE?G|PNG|GIF|BMP)$/)) {
                        if (contor === 0) {
                            container = container + "<div class='row'><div class='col span-1-of-3 picture-box'><div class='galerie-picture'><img src='" + dir + "/" + val + "'></div></div>";
                            contor++;
                        }
                        else if (contor === 2) {
                            container = container + "<div class='col span-1-of-3 picture-box'><div class='galerie-picture'><img src='" + dir + "/" + val + "'></div></div></div>";
                            contor = 0;
                        }
                        else {
                            container = container + "<div class='col span-1-of-3 picture-box'><div class='galerie-picture'><img src='" + dir + "/" + val + "'></div></div>";
                            contor++;
                        }
                    }
                });
                $(".modal-content").append(container);
            }
        });
    }
    $(document).on("click", '.modal-content .galerie-picture img', function (event) {
        $(".enlarge-content").append(this);
    });
    span.onclick = function () {
            modal.style.display = "none";
            document.documentElement.style.overflow = 'auto';
            $(".modal-content").html("");
        }
        /*-----------------menu navigation-----------------------------*/
    $(document).on("scroll", onScroll);
    $('a[href*="#"]:not([href="#"])').click(function () {
        $(document).off("scroll");
        $('.main-nav li a').each(function () {
            $(this).removeClass('sticky_hover');
        })
        $(this).addClass('sticky_hover');
        var target = this.hash
            , menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 80
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

    function onScroll(event) {
        var scrollPos = $(document).scrollTop() + 80;
        $('.main-nav a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (Math.floor(refElement.position().top) <= scrollPos && Math.floor(refElement.position().top) + refElement.height() > scrollPos) {
                $('.main-nav li').removeClass("sticky_hover");
                currLink.addClass("sticky_hover");
            }
            else {
                currLink.removeClass("sticky_hover");
            }
        });
    }
    /*--------------------mobile-navigation---------------------------------------*/
    $('#js--scroll-cine-suntem').click(function () {
        $('html, body').animate({
            scrollTop: $('.js--section-cine-suntem').offset().top - 80
        }, 1000);
    })
    $('.js--nav-icon').click(function () {
        var nav = $('.js--main-nav');
        var icon = $('.js--nav-icon i');
        nav.slideToggle(100);
        if (icon.hasClass('ion-navicon-round')) {
            icon.addClass('ion-close-round');
            icon.removeClass('ion-navicon-round');
        }
        else {
            icon.addClass('ion-navicon-round');
            icon.removeClass('ion-close-round');
        }
    });
    /*--------------------animation cum-lucram---------------------------------------*/
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth));
    }
    var items = document.querySelectorAll(".timeline li");

    function callbackFunc() {
        for (var i = 0; i < items.length; i++) {
            if (isElementInViewport(items[i])) {
                items[i].classList.add("in-view");
            }
        }
    }
    window.addEventListener("load", callbackFunc);
    window.addEventListener("scroll", callbackFunc);
});
/*--------------------sticky menu---------------------------------------*/
function init() {
    window.addEventListener('scroll', function (e) {
        var distanceY = window.pageYOffset || document.documentElement.scrollTop
            , shrinkOn = 50
            , navigation = document.querySelector("nav");
        if (distanceY > shrinkOn) {
            classie.add(navigation, "smaller");
        }
        else {
            if (classie.has(navigation, "smaller")) {
                classie.remove(navigation, "smaller");
            }
        }
    });
}
window.onload = init();