$(document).ready(function() {
    "use strict";

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
        dotsEach: true
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
            currentBlock.css('height', 'auto')
        } else {
            currentBlock.css('height', '0px')
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

        $('#' + prevNumber).addClass('tariff_right_hide') //скрываем старый блок
        function prevClassDelete() {
            $('#' + prevNumber).removeClass('tariff_right_hide')
        }
        setTimeout(prevClassDelete, 1000);

        //SHOW

        $('#' + tariffNumber).addClass('tariff_left_show') //показываем новый блок
        function currentClassDelete() {
            $('#' + prevNumber).removeClass('tariff_left_show')
        }
        setTimeout(currentClassDelete, 1000);
    });
});