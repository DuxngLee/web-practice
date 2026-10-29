(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        }
    });


   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });



    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        var input = button.parent().parent().find('input');
        var maxValue = Number(input.attr('max')) || Infinity;
        if (button.hasClass('btn-plus')) {
            var newVal = Math.min(parseFloat(oldValue) + 1, maxValue);
        } else {
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        input.val(newVal);
    });

    // Simple client-side cart
    var cartStorageKey = 'laptopshop-cart';

    function readCart() {
        try {
            var cart = JSON.parse(localStorage.getItem(cartStorageKey) || '{}');
            return cart && typeof cart === 'object' && !Array.isArray(cart) ? cart : {};
        } catch (error) {
            return {};
        }
    }

    function updateCartCount(cart) {
        var total = Object.keys(cart).reduce(function (sum, productId) {
            return sum + Number(cart[productId] || 0);
        }, 0);
        $('[data-cart-count]').text(total);
    }

    var shoppingCart = readCart();
    updateCartCount(shoppingCart);

    $(document).on('click', '[data-add-to-cart]', function () {
        var button = $(this);
        var productId = String(button.data('product-id'));

        var quantityInput = button.data('quantity-input');
        var quantity = quantityInput ? Number($(quantityInput).val()) || 1 : 1;
        shoppingCart[productId] = Number(shoppingCart[productId] || 0) + quantity;
        localStorage.setItem(cartStorageKey, JSON.stringify(shoppingCart));
        updateCartCount(shoppingCart);

        var originalContent = button.html();
        button.prop('disabled', true).html('<i class="fas fa-check"></i> Đã thêm');
        window.setTimeout(function () {
            button.prop('disabled', false).html(originalContent);
        }, 1000);
    });

})(jQuery);
