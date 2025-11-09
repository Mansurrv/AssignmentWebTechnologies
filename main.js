$(document).ready(function() {
    function showPage(pageId) {
        $('.page-content').hide();
        $('#' + pageId + '-page').fadeIn(400); 
        $('.nav-link').removeClass('active');
        $(`[data-page="${pageId}"]`).each(function() {
            $(this).addClass('active');
        });
        window.location.hash = pageId;
    }

    $('.nav-link, .btn, .navbar-brand, .footer a').on('click', function(e) {
        const page = $(this).data('page');
        if (page) {
            e.preventDefault();
            showPage(page);
            $('.navbar-collapse').collapse('hide'); 
        }
    });

    const initialPage = window.location.hash.substring(1) || 'home';
    showPage(initialPage);

    const contactForm = $('#contactForm');
    const successMessage = $('#successMessage');

    contactForm.on('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        $(this).find('input, textarea').each(function() {
            const input = $(this);
            input.removeClass('is-invalid');
            
            if (input.prop('required') && input.val().trim() === '') {
                input.addClass('is-invalid');
                isValid = false;
            }
            
            if (input.attr('type') === 'email' && input.val().trim() !== '') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.val().trim())) {
                    input.addClass('is-invalid');
                    isValid = false;
                }
            }
        });

        if (isValid) {
            successMessage.hide();
            successMessage.slideDown(500, function() {
                $(this).delay(4000).slideUp(500);
            });
            this.reset();
            $(this).find('input, textarea').removeClass('is-invalid');
        }
    });
});
