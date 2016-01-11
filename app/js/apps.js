/* global Pace */
/*   
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.1
Version: 1.5.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin-v1.5/
    ----------------------------
        APPS CONTENT TABLE
    ----------------------------
    
    <!-- ======== GLOBAL SCRIPT SETTING ======== -->
    01. Handle Home Content Height
    02. Handle Header Navigation State
    03. Handle Commas to Number
    04. Handle Page Container Show
    05. Handle Pace Page Loading Plugins
    06. Handle Page Scroll Content Animation
    07. Handle Header Scroll To Action
    08. Handle Tooltip Activation 
	
    <!-- ======== APPLICATION SETTING ======== -->
    Application Controller
    */



/* 01. Handle Home Content Height
------------------------------------------------ */
var handleHomeContentHeight = function () {
    $('#home').height($(window).height());
};

var handleOwlCarousel = function () {
    $("#owl-carousel").owlCarousel({

        autoPlay: 5000,
        navigation: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });
};

var handleParallax = function () {
    $.fn.exists = function (callback) {
        var args = [].slice.call(arguments, 1);

        if (this.length) {
            callback.call(this, args);
        }

        return this;
    };
    /*==================================
      Parallax  
      ====================================*/
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // Detect ios User // 
        $('.parallax-section').addClass('isios');
        $('.navbar-header').addClass('isios');
    }

    if (/Android|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Detect Android User // 
        $('.parallax-section').addClass('isandroid');
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Detect Mobile User // No parallax
        $('.parallax-section').addClass('ismobile');
        $('.parallaximg').addClass('ismobile');

    } else {
        // All Desktop 
        $(window).bind('scroll', function (e) {
            parallaxScroll();
        });

        var parallaxScroll = function () {
            var scrolledY = $(window).scrollTop();
            $('.parallaximg').css('marginTop', '' + ((scrolledY * 0.3)) + 'px');
        };


        $('.parallax-image-1').exists(function () {
            var offsetParallax1 = $(".parallax-image-1").offset().top;
            $('.parallax-image-1').parallax("0%", offsetParallax1 + 8000, 0.2, true);
        });
    }
};


/* 02. Handle Header Navigation State
------------------------------------------------ */
var handleHeaderNavigationState = function () {
    $(window).on('scroll load', function () {
        if ($('#header').attr('data-state-change') != 'disabled') {
            var totalScroll = $(window).scrollTop();
            var headerHeight = $('#header').height();
            if (totalScroll >= headerHeight) {
                $('#header').addClass('navbar-small');
                $('#header-logo').removeClass('logo-header');
                $('#header-logo').addClass("logo-header-dark");

            } else {
                $('#header').removeClass('navbar-small');
                $('#header-logo').removeClass('logo-header-dark');
                $('#header-logo').addClass("logo-header");


            }
        }
    });
};


/* 03. Handle Commas to Number
------------------------------------------------ */
var handleAddCommasToNumber = function (value) {
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};


/* 04. Handle Page Container Show
------------------------------------------------ */
var handlePageContainerShow = function () {
    $('#page-container').addClass('in');
};


/* 05. Handle Pace Page Loading Plugins
------------------------------------------------ */
var handlePaceLoadingPlugins = function () {
    Pace.on('hide', function () {
        $('.pace').addClass('hide');
    });
};


/* 06. Handle Page Scroll Content Animation
------------------------------------------------ */
var handlePageScrollContentAnimation = function () {
    $('[data-scrollview="true"]').each(function () {
        var myElement = $(this);

        var elementWatcher = scrollMonitor.create(myElement, 60);

        elementWatcher.enterViewport(function () {
            $(myElement).find('[data-animation=true]').each(function () {
                var targetAnimation = $(this).attr('data-animation-type');
                var targetElement = $(this);
                if (!$(targetElement).hasClass('contentAnimated')) {
                    $(this).addClass(targetAnimation + ' contentAnimated');
                }
            });
        });
    });
};


/* 07. Handle Header Scroll To Action
------------------------------------------------ */
var handleHeaderScrollToAction = function () {
    $('[data-click=scroll-to-target]').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var target = $(this).attr('href');
        var headerHeight = 50;
        $('html, body').animate({
            scrollTop: $(target).offset().top - headerHeight
        }, 500);

        if ($(this).attr('data-toggle') == 'dropdown') {
            var targetLi = $(this).closest('li.dropdown');
            if ($(targetLi).hasClass('open')) {
                $(targetLi).removeClass('open');
            } else {
                $(targetLi).addClass('open');
            }
        }
    });
    $(document).click(function (e) {
        if (!e.isPropagationStopped()) {
            $('.dropdown.open').removeClass('open');
        }
    });
};

var handlePageScrollContentAnimation = function () {


    var onSuccess = function (data) {
        
        var percent = data.funded;
        
        percent = percent > 100 ? 100 : percent;
        
        $('#progressbar').width(percent+'%');
        
        $('#progressbar').prop('aria-valuenow', percent);
        
        $('#progressbar').text(percent + '%');
        
        
        
        $('[data-scrollview="true"]').each(function () {
            var myElement = $(this);

            var elementWatcher = scrollMonitor.create(myElement, 60);

            elementWatcher.enterViewport(function () {
                $(myElement).find('[data-animation=true]').each(function () {
                    var targetAnimation = $(this).attr('data-animation-type');
                    var targetElement = $(this);
                    if (!$(targetElement).hasClass('contentAnimated')) {

                            $({ animateNumber: 0 }).animate({ animateNumber: data[targetAnimation] }, {
                                duration: 1000,
                                easing: 'swing',
                                step: function () {
                                    var displayNumber = handleAddCommasToNumber(Math.ceil(this.animateNumber));
                                    $(targetElement).text(displayNumber).addClass('contentAnimated');
                                }
                            });

                    }
                });
            });
        });
    };

    $.get('api/milestone', onSuccess);
};



/* 08. Handle Tooltip Activation
------------------------------------------------ */
var handleTooltipActivation = function () {
    if ($('[data-toggle=tooltip]').length !== 0) {
        $('[data-toggle=tooltip]').tooltip('hide');
    }
};

var handleScrollIcon = function () {
    var w = $(window).width();
    var icon = $('.next-section');
    icon.css('left', w / 2 - icon.width() / 2);

    icon.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var target = "#cono";
        var headerHeight = 71;
        $('html, body').animate({
            scrollTop: $(target).offset().top - headerHeight
        }, 500);
    });
};






/* Application Controller
------------------------------------------------ */
var App = function () {
    "use strict";

    return {
        //main function
        init: function () {
            handleHomeContentHeight();
            handleHeaderNavigationState();
            handlePageContainerShow();
            handlePaceLoadingPlugins();
            handlePageScrollContentAnimation();
            handleHeaderScrollToAction();
            handleTooltipActivation();
            handleParallax();
            handleOwlCarousel();
            handleScrollIcon();
            handlePageScrollContentAnimation();
        }
    };
} ();