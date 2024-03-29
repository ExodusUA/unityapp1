$(document).ready(function() {

    "use strict";

    /* FIXED NEMU */
    var bodyWidth = $('body').width();

    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };
    if (bodyWidth < 950) {
        $(window).on('resize scroll', function() {
            if ($('.header').isInViewport()) {
                $('.fixed__menu_mb').css('transform', 'translate3d(0, -110%, 0)');
            } else {
                $('.fixed__menu_mb').css('transform', 'translate3d(0, 0%, 0)');
            }
        });
    } else {
        $(window).on('resize scroll', function() {
            if ($('.header').isInViewport()) {
                $('.fixed__menu').css('transform', 'translate3d(0, -110%, 0)');
            } else {
                $('.fixed__menu').css('transform', 'translate3d(0, 0%, 0)');
            }
        });
    }
    if (bodyWidth < 950) {
        $('.mobile__menu').css('overflow-y', 'scroll');
    }

    /* TOP BUTTON */

    var progressValue = document.querySelector('.progress');
    var RADIUS = 50;
    var CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    function progress(value) {
        var progress = value / 100;
        var dashoffset = CIRCUMFERENCE * (1 - progress);
        progressValue.style.strokeDashoffset = dashoffset;
    }
    progressValue.style.strokeDasharray = CIRCUMFERENCE;
    var pageHeight = $(document).outerHeight(true);

    $(window).on('scroll', function() {
        var distanceScrolled = $(window).scrollTop();
        var scrollPercent = (distanceScrolled * 100) / pageHeight;
        progress(scrollPercent);
    });

    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $(window).on('resize scroll', function() {
        if ($('.header_phone').isInViewport()) {
            $('.scroll_up').removeClass('scroll_up_visible');
        } else {
            $('.scroll_up').addClass('scroll_up_visible');
        }
    });

    /* END */

    /* PRELOADER */

    setTimeout(preLoader, 1500);

    function preLoader() {
        setTimeout(loadingHide(), 1000);

        function loadingHide() {
            $('.loader').css('display', 'none')
        }
        $('.preloader__left').addClass('preloader__left_hidden');
        $('.preloader__right').addClass('preloader__right_hidden');

        window.setTimeout(function() {
            document.body.classList.add('loaded');
            document.body.classList.remove('loaded_hiding');
        }, 1000);
    }

    /* END */

    /* APP STATS COUNTER */
    function statsCounter() {
        $(".app__stats_num > span").each(function() {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 1500,
                easing: 'swing',
                step: function(now) {
                    $(this).text(Math.ceil(now));
                }
            })
        })
    }

    function scrollEvent() {
        var wt = $(window).scrollTop();
        var wh = $(window).height();
        var et = $('#app__stats').offset().top;
        var eh = $('#app__stats').outerHeight();
        var dh = $(document).height();
        if (wt + wh >= et || wh + wt == dh || eh + et < wh) {
            statsCounter();
            window.removeEventListener("scroll", scrollEvent);
        }
    }
    window.addEventListener("scroll", scrollEvent);
    /* END */

    /* GALLERY SLIDER */
    $(".owl-carousel").owlCarousel({
        center: true,
        dots: true,
        autoplay: true,
        loop: true,
        dotsEach: true,
        responsive: {
            0: {
                items: 1
            },
            414: {
                items: 1
            },
            430: {
                items: 1
            },
            431: {
                items: 3
            }
        }
    });
    /* END */


    /* FAQ SPOILER */
    $('.faq__body_item').click(function() {
        var currentList = $(this).find('.faq_body_desc > p');
        currentList.toggleClass('faq__active');
        var currentBlock = $(this).find('.faq_body_desc');

        $(this).find('.faq__body_answer > img').toggleClass('faq_icon_rotate_inactive');
        var faqIcon = $(this).find('.faq__body_answer > img');

        if (currentList.hasClass('faq__active')) {
            faqIcon.removeClass('faq_icon_rotate_inactive');
            faqIcon.addClass('faq_icon_rotate_active');
        } else {
            faqIcon.removeClass('faq_icon_rotate_active');
            faqIcon.addClass('faq_icon_rotate_inactive');
        }

        if (currentList.hasClass('faq__active')) {
            currentBlock.css('transition', '0.3s');
            currentBlock.css('height', '100px');

        } else {
            currentBlock.css('transition', '0.3s');
            currentBlock.css('height', '0px');
        }
    });
    /* END */

    /* PLAN CHOOSING */
    $('.pricing__term_card').click(function() {
        var prevNumber = $('.pricing__term_card-active').text().replace('day', '').replace('s', '');
        $('.pricing__term_card').removeClass('pricing__term_card-active');
        $(this).addClass('pricing__term_card-active');
        var tariffNumber = $(this).text().replace('day', '').replace('s', '');

        //HIDE
        $('#' + prevNumber).removeClass('tariff_left_show')
        $('#' + prevNumber).addClass('tariff_right_hide') //скрываем старый блок

        //SHOW
        $('#' + tariffNumber).removeClass('tariff_right_hide')
        $('#' + tariffNumber).addClass('tariff_left_show') //показываем новый блок
    });

    /* SMOOTH SCROLL */

    var $page = $('html, body');
    $('a[href*="#"]').click(function() {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 600);
        return false;
    });

    /* UNIQUE NAVIGATION */

    /* UP / DOWN BUTTONS */
    $('.navigation__links_list').css('transform', 'translateY(0px)');

    $('.navigation_arrows > img').click(function() {
        var currentArrow = $(this).attr('class');
        var list = $('.navigation__links_list');
        var currentStyle = $('.navigation__links_list').attr('style');
        var currentTranslate = Number(currentStyle.replace('transform: translateY(', '').replace('px);', ''));
        console.log(currentTranslate)
        if (currentArrow == 'up') {
            var translateSize = currentTranslate + 40;
            list.css('transform', 'translateY(' + translateSize + 'px)');
        } else {
            var translateSize = currentTranslate - 40;
            list.css('transform', 'translateY(' + translateSize + 'px)');
        }
    });

    /* HAMBURGER MENU */

    $('.mobile__hamburger').click(function() {
        $('.mobile__menu').removeClass('mobile__menu_hide');
        $('.mobile__menu').addClass('mobile__menu_show');
        $('html').attr('style', 'overflow-y:hidden');
        $('body').attr('style', 'overflow-y:hidden');
    });

    $('.mobile__menu_close').click(function() {
        $('.mobile__menu').removeClass('mobile__menu_show');
        $('.mobile__menu').addClass('mobile__menu_hide');
        $('body').attr('style', 'overflow-y:scroll');
        $('html').attr('style', 'overflow-y:scroll');
    })

    /* PAGE ANIMATION */
    var skroll = new Skroll()
        .add(".header__body_text > h1", {
            animation: "fadeInUp",
            duration: 600,
            wait: 250
        })
        .add(".header__body_text > p", {
            animation: "fadeInUp",
            delay: 120,
            duration: 600,
            wait: 350
        })
        .add(".header_phone", {
            animation: "slideInLeft",
            delay: 120,
            duration: 600,
            wait: 250
        })
        .add(".header__text_rating", {
            animation: "fadeInUp",
            delay: 600,
            duration: 0,
            wait: 0
        })
        .add(".about__body_title", {
            animation: "fadeInUp",
            duration: 600,
            wait: 450
        })
        .add(".about__body_desc", {
            animation: "fadeInUp",
            duration: 700,
            wait: 650
        })
        .add(".about__body_download", {
            animation: "slideInLeft",
            duration: 700,
            wait: 550
        })
        .add(".about__app_screen", {
            animation: "slideInRight",
            duration: 700,
            wait: 550
        })
        .add(".about__body_get_img", {
            animation: "fadeInUp",
            duration: 700,
            wait: 650
        })
        .add(".app__stats_item", {
            animation: "fadeInUp",
            duration: 700,
            wait: 650
        })
        .add(".features__left", {
            animation: "slideInLeft",
            duration: 700,
            wait: 550
        })
        .add(".features__right", {
            animation: "slideInRight",
            duration: 700,
            wait: 550
        })
        .add(".pricing__body_term", {
            animation: "fadeInUp",
            duration: 700,
            delay: 300,
        })

    .add("#left-card", {
            animation: "slideInLeft",
            duration: 700,
            wait: 550
        })
        .add("#right-card", {
            animation: "slideInRight",
            duration: 700,
            wait: 550
        })
        .add("#center-card", {
            animation: "fadeInUp",
            duration: 700,
            wait: 650
        })
        .add("#card1", {
            animation: "fadeInUp",
            duration: 700,
            wait: 650
        })
        .add("#card2", {
            animation: "fadeInUp",
            duration: 1000,
            wait: 650
        })
        .add("#card3", {
            animation: "fadeInUp",
            duration: 1300,
            wait: 650
        })
        .add("#card4", {
            animation: "fadeInUp",
            duration: 1600,
            wait: 650
        })

    .add(".contact__body_info", {
            animation: "slideInLeft",
            duration: 700,
            wait: 550
        })
        .add(".contact__body_form", {
            animation: "slideInRight",
            duration: 700,
            wait: 550
        })
        .add("#review1", {
            animation: "slideInLeft",
            duration: 700,
            wait: 550
        })
        .add("#review2", {
            animation: "slideInRight",
            duration: 700,
            wait: 550
        })
        .init();

});