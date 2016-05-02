$(document).ready(function () {

    $$.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $$('meta[name="csrf-token"]').attr('content')
        }
    });
    myApp.onPageInit('items-show', function (page) {
//TODO fix search

        var data = [];
        data["_token"] = $$('[name="_token"]').val();

        $$.ajax({

            url: $('#items').data('url'),
            type: 'GET',
            data: data,
            success: function (response) {
                var oData = JSON.parse(response);

                new Vue({
                    el: '#items',

                    data: {
                        items: oData
                    },

                });
            }
        });
    });




    var ptrContent = $$('.pull-to-refresh-content');

    ptrContent.on('refresh', function (e) {
        setTimeout(function () {
        }, 1000);
    });

    $$(document).on('click', '.delete', function (e) {
        e.preventDefault();
        var url = $$(this).attr("href");
        var data = [];
        data["_token"] = $$('[name="_token"]').val();
        var link = $$(this);
        $$.ajax({
            url: url,
            type: "DELETE",
            data: data,
            success: function (response) {
                console.log(response);
            }
        });
    });

    $$(document).on("click", ".swipe-click", function () {
        if (!$$(this).hasClass('swipeout-opened')) {
            myApp.swipeoutOpen($$(this), 'right');
        } else {
            myApp.swipeoutClose($$(this));
        }
    });

    $$('[data-editable]').each(function (i, el) {

        var url = $$(el).data('url');
        var options = {
            type: "input",
            cssclass: "editable",
            onblur: 'submit',
            submit: 'Ok',
            submitdata: {
                _method: "PUT",
                _token: $$('#token').text(),
                column: $$(el).data('editable')
            }
        };
        $$(el).editable(url, options);
    });


    $(document).on('DOMNodeInserted', function (e) {

        if ($(e.target).hasClass('editable')) {

            tinymce.init({selector: '.editable input'});

        }

    });

    setTimeout(function () {
        $('#banner-container div').addClass('open');
    }, 500);

    var token = $('meta[name="csrf-token"]').attr('content');

    $('div.alert').delay(3000).slideUp();


    $('.nav-container, #menu-list').click(function () {
        $('#nav-icon2,#menu-list').toggleClass('open');
    });

    $('.addtocart').on('click', function (e) {
        e.preventDefault();
        var data = [];
        //data['price'] = $(this).parent().prev().find('.lead').text();
        //data['name'] = $(this).parent().parent().prev().prev().text();
        data['product_id'] = $(this).data('product_id');
        //data['quantity'] = '1';
        data["_token"] = $('meta[name="csrf-token"]').attr('content');
        $.ajax({
            url: $(this).attr('href'),
            type: "POST",
            dataType: 'json',
            data: {product_id: data['product_id']},
            success: function (response) {
                console.log(response);
            }
        });

    });

    $('#cart-button').click(function () {
        $('#cart').toggleClass('open');
    });

    $('.dropdown-toggle').dropdown();

    jQuery.scrollSpeed(80, 600);

    function isScrolledIntoView(elem) {
        var centerY = Math.max(0, ((jQuery(window).height() - jQuery(elem).outerHeight()) / 2)
            + jQuery(window).scrollTop());

        var elementTop = jQuery(elem).offset().top;
        var elementBottom = elementTop + jQuery(elem).height();

        return elementTop <= centerY && elementBottom >= centerY;
    }
})
;


$(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});