import route from "../../modules/route.js";

const employeePages = [
    {
        title: "Darbalaukis",
        icon: "styles/images/icons/statistics.png",
        pageRoute: "/darbuotojo_darbalaukis",
    },
    {
        title: "Registracijos",
        icon: "styles/images/icons/clock.png",
        pageRoute: "/darbuotojo_registracijos",
    },
    {
        title: "Teikiamos paslaugos",
        icon: "styles/images/icons/barber.png",
        pageRoute: "/darbuotojo_paslaugos",
    },
    {
        title: "Nustatymai",
        icon: "styles/images/icons/settings.png",
        pageRoute: "/darbuotojo_nustatymai",
    },
    {
        title: "Atsijungti",
        icon: "styles/images/icons/logout.png",
        pageRoute: "/atsijungti",
    },
];

const employeeNav = (data = {}) => {
    let employeeNav = document.createElement("div");
    employeeNav.id = "employee-nav";
    employeeNav.innerHTML = /*html*/ `
    <div class="employee-nav__button-row" style="display: flex; justify-content: flex-start">
        <button class="employee-nav__toggler" id='e-nav-toggler'>
            <i class="fas fa-arrow-right"></i>
            <!--<i class="fas fa-arrow-left"></i>-->
        </button>
    </div>

    <div class='employee-nav__list-box' style='display: none'>
        <ul id='employee-page-list'>
        </ul>
    </div>
    `;

    const pageListElement = employeeNav.querySelector("#employee-page-list");
    employeePages.forEach((page) => {
        const listItemElem = document.createElement("li");
        listItemElem.addEventListener("click", () => route(page.pageRoute));
        listItemElem.innerHTML =
            /*html*/
            `
            <img src="${page.icon}" alt="icon" />
            <span>${page.title}</span>
        `;
        pageListElement.append(listItemElem);
    });

    const toggleButton = employeeNav.querySelector("#e-nav-toggler");
    const navListBox = employeeNav.querySelector(".employee-nav__list-box");
    toggleButton.addEventListener("click", () => {
        if (navListBox.style.display == "none") {
            navListBox.style.display = "block";
            toggleButton.innerHTML = /*html*/ `<i class="fas fa-arrow-left"></i>`;
            employeeNav.querySelector(
                ".employee-nav__button-row"
            ).style.justifyContent = "flex-end";
        } else {
            navListBox.style.display = "none";
            toggleButton.innerHTML = /*html*/ `<i class="fas fa-arrow-right"></i>`;
            employeeNav.querySelector(
                ".employee-nav__button-row"
            ).style.justifyContent = "flex-start";
        }
    });

    const trackWindowDimensions = () => {
        const windowWitdh = window.innerWidth;
        if (windowWitdh >= 1200) {
            employeeNav.querySelector(
                ".employee-nav__button-row"
            ).style.display = "none";
            navListBox.style.display = "block";
        } else {
            employeeNav.querySelector(
                ".employee-nav__button-row"
            ).style.display = "flex";
            navListBox.style.display = "none";
            toggleButton.innerHTML = /*html*/ `<i class="fas fa-arrow-right"></i>`;
        }
    };
    trackWindowDimensions();
    window.onresize = trackWindowDimensions;
    return employeeNav;
};
export default employeeNav;
