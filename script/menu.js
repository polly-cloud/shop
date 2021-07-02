function _createMenu() {
    const menu = document.createElement('div');
    menu.classList.add('menu');
    menu.insertAdjacentHTML('afterbegin', `
    <div class="nav-overlay" data-close="true">
        <nav class="nav">
            <button class="nav__btn" data-close="true">
                <i class="fas fa-times" data-close="true"></i>
            </button>
            <h5 class="nav__heading">
                MENU
            </h5>
            <ul class="nav__menu">

                <li class="nav__menu-head">
                    <a href="#" class="nav__menu-link nav__menu-link-pink">MAN</a>
                </li>

                <li class="nav__menu-item">
                    <a href="#" class="nav__menu-link">Accessories</a>
                </li>
                <li class="nav__menu-item">
                    <a href="#" class="nav__menu-link">Bags</a>
                </li>
                <li class="nav__menu-item">
                    <a href="#" class="nav__menu-link">Denim</a>
                </li>
                <li class="nav__menu-item">
                    <a href="#" class="nav__menu-link">T-Shirts</a>
                </li>


                <li class="nav__menu-head">
                    <a href="#" class="nav__menu-link nav__menu-link-pink">WOMAN</a>
                </li>

                <li class="nav__menu-item">
                    <a href="#" class="nav__menu-link">Accessories</a>
                </li>
                <li class="nav__menu-item">
                    <a href="#" class="nav__menu-link">Jackets & Coats</a>
                </li>
                <li class="nav__menu-item">
                    <a href="#" class="nav__menu-link">Polos</a>
                </li>
                <li class="nav__menu-item">
                    <a href="#" class="nav__menu-link">T-Shirts</a>
                </li>
                <li class="nav__menu-item">
                    <a href="#" class="nav__menu-link">Shirts</a>
                </li>
                </li>

                <li class="nav__menu-head">
                    <a href="#" class="nav__menu-link nav__menu-link-pink">KIDS</a>
                </li>

                <li class="nav__menu-item">
                    <a href="#" class="nav__menu-link">Accessories</a>
                </li>
                <li class="nav__menu-item">
                    <a href="#" class="nav__menu-link">Jackets & Coats</a>
                </li>
                <li class="nav__menu-item">
                    <a href="#" class="nav__menu-link">Polos</a>
                </li>
                <li class="nav__menu-item">
                    <a href="#" class="nav__menu-link">T-Shirts</a>
                </li>
                <li class="nav__menu-item">
                    <a href="#" class="nav__menu-link">Shirts</a>
                </li>
                <li class="nav__menu-item">
                    <a href="#" class="nav__menu-link">Bags</a>
                </li>
            </ul>
        </nav>
    </div>
    `)
    document.body.appendChild(menu);
    return menu
}


$.menu = function() {
    const ANIMATION_SPEED = 300;
    const $menu = _createMenu();
    let closing = false;

    const menu = {
        open() {
            !closing && $menu.classList.add('nav-open');
        },
        close() {
            closing = true;
            $menu.classList.remove('nav-open')
            $menu.classList.add('nav-close');
            setTimeout(() => {
                $menu.classList.remove('nav-close');
                closing = false;
            }, ANIMATION_SPEED);

        },  
    }

    $menu.addEventListener('click', event => {
        if (event.target.dataset.close) {
            menu.close();
        }
    })

    return menu
}