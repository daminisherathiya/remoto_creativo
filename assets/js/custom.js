(function ($) {
    'use strict';

    // Function to update the content based on the current language
    function updateContent() {
        $("[data-i18n]").each(function () {
            var key = $(this).data("i18n");
            $(this).text(i18next.t(key));
        });

        $("a[data-i18n-link]").each(function () {
            var key = $(this).data("i18n-link");
            $(this).attr("href", i18next.t(key));
        });
        $("button[data-i18n-link]").each(function () {
            var key = $(this).data("i18n-link");
            $(this).attr("data-href", i18next.t(key));
        });
    }

    // Function to update the language of the dropdown based on the given language
    function selectLanguageAndUpdateContent(languageName) {
        const languageSwitcher = $(".language-switcher");
        const language = $(`[data-language="${languageName}"]`);

        // Populate the language to show on the dropdown
        const languageHTMLExcludingSelectImg = language.find(".option-text > span").html().trim();
        languageSwitcher.find(".sBtn-text").html(languageHTMLExcludingSelectImg);

        // Collapse
        languageSwitcher.removeClass("active");

        // Add the select checkmark for the selected option
        languageSwitcher.find(".option").removeClass("selected");
        language.addClass("selected");

        // Change the language in i18next and update the content
        i18next.changeLanguage(languageName, updateContent);
    }

    // Language selector
    $(document).ready(function () {
        const languageSwitcher = $(".language-switcher");

        // Expand/collapse upon clicking on the button
        languageSwitcher.find(".select-btn").click(function () {
            languageSwitcher.toggleClass("active");
        });

        // Trigger selectLanguageAndUpdateContent upon language selection
        languageSwitcher.find(".option").each(function () {
            $(this).click(function () {
                selectLanguageAndUpdateContent($(this).data("language"));
            });
        });
    });

    // i18next initialization
    i18next
        .use(i18nextBrowserLanguageDetector)
        .use(i18nextHttpBackend)
        .init({
            fallbackLng: "en",
            debug: false,
            backend: {
                loadPath: pathPrefix + "locales/{{lng}}/translation.json"
            },
        }, function (err, t) {
            selectLanguageAndUpdateContent(["en", "es"].includes(i18next.language.split('-')[0]) ? i18next.language.split('-')[0] : "en");
        });
})(jQuery);

(function ($) {
    'use strict';

    // Mean Menu JS
    jQuery('.mean-menu').meanmenu({
        meanScreenWidth: "991"
    });

    // Navbar Area
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 150) {
            $('.navbar-area').addClass("sticky-nav");
        }
        else {
            $('.navbar-area').removeClass("sticky-nav");
        }
    });

    // Search Overlay JS
    $(".nav-side .search-box i").on("click", function () {
        $(".search-overlay").toggleClass("search-overlay-active");
    });
    $(".search-close").on("click", function () {
        $(".search-overlay").removeClass("search-overlay-active");
    });

    // Others Option For Responsive JS
    $(".side-nav-responsive .dot-menu").on("click", function () {
        $(".side-nav-responsive .container-max .container").toggleClass("active");
    });

    // Banner Slider 
    $('.banner-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        items: 1,
        dots: true,
        autoplay: true,
        autoHeight: true,
        autoplayHoverPause: true,
    })

    // Case Study Slider
    $('.case-study-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        center: true,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1024: {
                items: 3
            },
            1200: {
                items: 4
            },
        },
    })

    // Brand Slider
    $('.brand-slider').owlCarousel({
        loop: true,
        margin: 60,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 2
            },
            700: {
                items: 3
            },
            1024: {
                items: 5
            }
        },
    })

    // Clients Slider
    $('.clients-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        },
        navText: [
            "<i class='bx bx-chevron-left'></i>",
            "<i class='bx bx-chevron-right'></i>"
        ],
    })

    // Clients Slider
    $('.banner-sub-slider').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            1024: {
                items: 3
            }
        },
    })

    // Popup Video
    $('.popup-btn').magnificPopup({
        disableOn: 320,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // Nice Select JS
    $('select').niceSelect();

    // FAQ Accordion JS
    $('.accordion').find('.accordion-title').on('click', function () {
        // Adds Active Class
        $(this).toggleClass('active');
        // Expand or Collapse This Panel
        $(this).next().slideToggle('fast');
        // Hide The Other Panels
        $('.accordion-content').not($(this).next()).slideUp('fast');
        // Removes Active Class From Other Titles
        $('.accordion-title').not($(this)).removeClass('active');
    });

    // WOW JS
    new WOW().init();

    // Preloader JS
    $(window).on('load', function () {
        $(".preloader").fadeOut(500);
    });



    // Count Time JS
    function makeTimer() {
        var endTime = new Date("December 30, 2021 17:00:00 PDT");
        var endTime = (Date.parse(endTime)) / 1000;
        var now = new Date();
        var now = (Date.parse(now) / 1000);
        var timeLeft = endTime - now;
        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }
        $("#days").html(days + "<span>Days</span>");
        $("#hours").html(hours + "<span>Hours</span>");
        $("#minutes").html(minutes + "<span>Minutes</span>");
        $("#seconds").html(seconds + "<span>Seconds</span>");
    }
    setInterval(function () { makeTimer(); }, 300);

    // Subscribe form
    $(".newsletter-form").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // Handle The Invalid Form...
            formErrorSub();
            submitMSGSub(false, "Please enter your email correctly");
        } else {
            // Everything Looks Good!
            event.preventDefault();
        }
    });
    function callbackFunction(resp) {
        if (resp.result === "success") {
            formSuccessSub();
        }
        else {
            formErrorSub();
        }
    }
    function formSuccessSub() {
        $(".newsletter-form")[0].reset();
        submitMSGSub(true, "Thank you for subscribing!");
        setTimeout(function () {
            $("#validator-newsletter").addClass('hide');
        }, 4000)
    }
    function formErrorSub() {
        $(".newsletter-form").addClass("animated shake");
        setTimeout(function () {
            $(".newsletter-form").removeClass("animated shake");
        }, 1000)
    }
    function submitMSGSub(valid, msg) {
        if (valid) {
            var msgClasses = "validation-success";
        } else {
            var msgClasses = "validation-danger";
        }
        $("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
    }

    // AJAX MailChimp
    $(".newsletter-form").ajaxChimp({
        url: "https://envyTheme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
        callback: callbackFunction
    });

    // Set the year in copyright dynamically
    $("#current-year").html(new Date().getFullYear());
})(jQuery);
