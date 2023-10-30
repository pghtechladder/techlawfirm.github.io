(function () {

    const $offcanvasoverlay = $('.offcanvas-overlay'),
        $burgerBtn = $('.main-navbar__btn-burger'),
        $mainNavbar = $('.main-navbar'),
        $dropdownToggler = $('.main-navbar__dropdown-toggler');

    $offcanvasoverlay.on('click', function () {
        toggleBurger();
    });

    $burgerBtn.on('click', function () {
        toggleBurger();
    });

    function toggleBurger() {
        $burgerBtn.toggleClass('main-navbar__btn-burger_active')
        $mainNavbar.toggleClass('main-navbar_open');
        $offcanvasoverlay.toggleClass('offcanvas-overlay_active');
    }

    $dropdownToggler.on('click', function (e) {
        const $this = $(this);
        e.preventDefault();
        $this.toggleClass('main-navbar__dropdown-toggler_open');
        $this.parent().next().toggleClass('main-navbar__dropdown_open');
    });

    $('.selected-lang').on('click', function () {
        const $this = $(this);
        $this.next().toggleClass('active')
    });

    (function () {
        var $mainMenuContainer = $('#main-menu');
        var $mainNavbarNav = $('.main-navbar__nav');
        var $items = $('.main-navbar__item');

        function unique(arr) {
            let result = [];
            for (let str of arr) {
                if (!result.includes(str)) {
                    result.push(str);
                }
            }
            return result;
        }

        var itemsByPriority = {};
        var sortable = [];
        $items.each(function () {
            var $this = $(this);
            var priority = $this.data('priority')
            if (!itemsByPriority[priority]) {
                itemsByPriority[priority] = $();
            }
            $this[0].itemLink = $this.find('.main-navbar__link');
            itemsByPriority[priority] = itemsByPriority[priority].add($this);
            sortable.push(priority);
        })

        sortable = unique(sortable)

        var burgerMenuEnabled = true;

        function offBurgerMenu() {
            burgerMenuEnabled = false;
            $burgerBtn.removeClass('main-navbar__btn-burger_active')
            $mainNavbar.removeClass('main-navbar_open');
            $offcanvasoverlay.removeClass('offcanvas-overlay_active');
            $burgerBtn.hide();
        }

        function onBurgerMenu() {
            $burgerBtn.show();
        }

        function recalculateMenu() {
            var containerWidth = $mainMenuContainer.width()

            var totalWidth = 0
            $.each(sortable, function () {

                var $items = itemsByPriority[this];

                $.each($items, function () {
                    var currentLinkWidth = this.itemLink.outerWidth(true);
                    totalWidth += currentLinkWidth;
                })

                if (containerWidth > totalWidth) {
                    $mainMenuContainer.append($items)
                } else {
                    $mainNavbarNav.append($items)
                }
            })

            if ($('*', $mainNavbarNav).length === 0) {
                offBurgerMenu()
            } else if (burgerMenuEnabled === false) {
                onBurgerMenu()
            }
        }

        $(window).on('resize', function () {
            recalculateMenu()
        });

        setTimeout(recalculateMenu, 1000)
    })()
})()