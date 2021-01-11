$(function () {
    // remove css transition on load
    $(window).on("load", function () {
        $("body").removeClass("preload");
    });
    // sidebar - scroll to active navigation chapter (if not visible)
    if (
        $(".sidebar .subnavigation__list-item--active").length &&
        $(".sidebar .subnavigation__list-item--active")
            .closest("ul.subnavigation__list")
            .closest("li").length
    ) {
        var sidebarHeight = $(".sidebar").height();
        var sidebarTopPosition = $(".sidebar").offset().top;
        var activeMenuTopPosition = $(
            ".sidebar .subnavigation__list-item--active"
        )
            .closest("ul.subnavigation__list")
            .closest("li")
            .offset().top;
        if (activeMenuTopPosition > sidebarHeight + sidebarTopPosition) {
            $(".sidebar").scrollTop(activeMenuTopPosition - sidebarTopPosition);
        }
    }
    // sidebar, toc and header position
    setSidebarOpenClose();
    setSidebarAndTocPosition();
    $(window).scroll(function () {
        stickyHeader();
        setSidebarAndTocPosition();
    });
    $(window).resize(function () {
        setSidebarOpenClose();
        setSidebarAndTocPosition();
    });

    // toggle-sidebar
    $(".sidebar-toggler").on("click", function () {
        $("body").attr(
            "data-sidebar",
            $("body").attr("data-sidebar") === "open" ? "closed" : "open"
        );
        setTimeout(setSidebarAndTocPosition, 300);
    });

    // fix anchor position with fixed header
    $.each($(".content [id]:not(h1)"), function () {
        var anchorMarginTop = parseInt($(this).css("margin-top"));
        var headerHeight = $(".header").innerHeight();
        $(this)
            .addClass("anchor")
            .css("border-top", headerHeight + "px solid transparent")
            .css("margin-top", anchorMarginTop - headerHeight);
    });

    // add achorjs to overview
    anchors.add(".overview h3");

});

/**
 * Calculate position for sidebar and toc
 */
function setSidebarAndTocPosition() {
    // top position
    var mainPositionTop = $("[role=main]").offset().top - $(window).scrollTop();
    var headerHeight = $(".header").innerHeight();
    mainPositionTop =
        mainPositionTop < headerHeight ? headerHeight : mainPositionTop; // min value = headerHeight
    $(".sidebar, .toc__container").css("top", mainPositionTop);
    // bottom position
    var footerPositionTop = $(".footer").offset().top - $(window).scrollTop();
    var windowHeight = $(window).height();
    var sidebarPositionBottom = windowHeight - footerPositionTop;
    sidebarPositionBottom =
        sidebarPositionBottom < 0 ? 0 : sidebarPositionBottom; // min value = 0
    $(".sidebar").css("bottom", sidebarPositionBottom);
    // right position for toc
    var tocRightPosition =
        parseInt($("[role=main] > .container").css("margin-left")) +
        parseInt($(".content").css("margin-left")) -
        $(".toc__container").width();
    $(".toc__container").css("right", tocRightPosition);
}

/**
 * Sticky header
 */
function stickyHeader() {
    var headerPositionTop = $(".header").offset().top;
    if ($(window).scrollTop() >= $(".navbar").innerHeight()) {
        $(".header").addClass("sticky");
        $('[role="main"]').addClass("padding-sticky");
    } else {
        $(".header").removeClass("sticky");
        $('[role="main"]').removeClass("padding-sticky");
    }
}

/**
 * set sidebar as open or close dependig on window width
 */
function setSidebarOpenClose() {
    if ($(".sidebar").length) {
        $("body").attr(
            "data-sidebar",
            $(window).width() < 1450 ? "closed" : "open"
        );
    }
}
