import route from "../../modules/route.js";

const pages = [
    {
        title: "<img src='styles/images/icons/house.png' alt='Home page link' width='30' height='30'/>",
        pageRoute: "/pradzia",
    },
    {
        title: "Paslaugos",
        pageRoute: "/paslaugos",
    },
    {
        title: "Registracija",
        pageRoute: "/registracija",
    },
    {
        title: "Kontaktai",
        pageRoute: "/kontaktai",
    },
];

const header = (data = {}) => {
    let header = document.createElement("div");
    header.id = "header-content";
    header.innerHTML =
        /*html*/
        `
        <div class='header__left'>
            <div class='header__logo-box'>
                <img class='header__logo' src='styles/images/logo/logo_No_3_for_mobile.png' alt='Oldschool Barbershop logo' />
            </div>
            <nav class='header__nav d-none'>
                <ul class='header__nav-list' id='nav-list'>
                </ul>
            </nav>
        </div>
        <div class='header__right'>
            <button class='header__nav-toggle-button' id='nav-toggle'>
                <img class='header__nav-toggle-icon' src='styles/images/icons/menu.png' alt='Nav toggle'>
            </button>
            <div class='header__social-links-box'>
                <a href='#'>
                    <img src='styles/images/icons/facebook.png' alt='Facebook link'/>
                </a>
                <a href='#'>
                    <img src='styles/images/icons/instagram.png' alt='Instagram link'/>
                </a>
            </div>
        </div>
        `;
    return header;
};

const updateHeader = (data = {}) => {
    const navMenuList = document.querySelector("#nav-list");
    navMenuList.innerHTML = "";

    pages.forEach((pageObj) => {
        let li = document.createElement("li");

        li.classList.add("header__nav-list-item");
        if (pageObj.pageRoute == data.pageRoute) {
            li.classList.add("current-page");
        }

        li.dataset.pageRoute = pageObj.pageRoute;
        li.innerHTML = pageObj.title;
        li.addEventListener("click", () => {
            mobileHideNavOnClick();
            route(li.dataset.pageRoute);
        });
        navMenuList.appendChild(li);
    });
};

const initHeader = (parentElement, data = {}) => {
    if (parentElement.innerHTML == "") {
        parentElement.append(header(data));

        const navToggler = document.querySelector("#nav-toggle");
        const nav = document.querySelector(".header__nav");
        navToggler.addEventListener("click", () => {
            if (nav.classList.contains("d-none"))
                nav.classList.remove("d-none");
            else nav.classList.add("d-none");
        });
        configureResponsiveHeader();
        window.addEventListener("resize", () => configureResponsiveHeader());
    }
    updateHeader(data);
};

const mobileHideNavOnClick = () => {
    const navToggler = document.querySelector("#nav-toggle");
    const nav = document.querySelector(".header__nav");
    if (getComputedStyle(navToggler).display == "flex") {
        if (!nav.classList.contains("d-none")) {
            nav.classList.add("d-none");
        }
    }
};

const configureResponsiveHeader = () => {
    const nav = document.querySelector(".header__nav");
    const logo = document.querySelector(".header__logo");

    const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
    );
    if (vw >= 768) {
        if (nav.classList.contains("d-none")) nav.classList.remove("d-none");

        logo.src = "styles/images/logo/logo_No_1.png";
    } else {
        if (!nav.classList.contains("d-none")) nav.classList.add("d-none");
        logo.src = "styles/images/logo/logo_No_3_for_mobile.png";
    }
};

export default initHeader;
