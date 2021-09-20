import initHeader from "../views/components/header.js";
import initFooter from "../views/components/footer.js";

import home from "../views/home.js";
import services from "../views/services.js";
import registration from "../views/registration.js";
import contacts from "../views/contacts.js";
import pageNotFound from "../views/404.js";
import contactsMessageSent from "../views/contactsMessageSent.js";
import registrationComplete from "../views/registrationComplete.js";
import login from "../views/login.js";
import errorView from "../views/error.js";

import { initStyles, setMainStyle } from "../modules/initStyles.js";

const headerElement = document.querySelector("header");
const mainElement = document.querySelector("main");
const footerElement = document.querySelector("footer");

const setParam = (key, value) => {
    if (history.pushState) {
        var newurl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            `?${key}=${value}`;
        window.history.pushState({ path: newurl }, "", newurl);
    }
};

const setView = (viewFunc, styleSource, data = {}) => {
    setMainStyle(styleSource);
    const { view, viewDidMount } = viewFunc(data);
    mainElement.append(view);
    viewDidMount();
};

const setProtectedView = async (viewSource, styleSource, data) => {
    setMainStyle(styleSource);
    const protectedView = await importProtectedView(viewSource);
    const { view, viewDidMount } = protectedView(data);
    mainElement.append(view);
    viewDidMount();
};

const importProtectedView = async (URI) => {
    return await import(URI)
        .then((module) => module.default)
        .catch((error) => console.log(error));
};

const render = (page, data = {}) => {
    initStyles();

    initHeader(headerElement, { pageRoute: "/" + page });
    initFooter(footerElement, {});

    mainElement.innerHTML = "";
    setParam("page", page);

    switch (page) {
        case "pradzia":
            setView(home, "styles/css/home.css", data);
            break;

        case "paslaugos":
            setView(services, "styles/css/services.css", data);
            break;

        case "registracija":
            setView(registration, "styles/css/registration.css", data);
            break;

        case "kontaktai":
            setView(contacts, "styles/css/contacts.css", data);
            break;

        case "404":
            setView(pageNotFound, "styles/css/404.css", data);
            break;

        case "pranesimas_issiustas":
            setView(
                contactsMessageSent,
                "styles/css/contactsMessageSent.css",
                data
            );
            break;

        case "registracija_sekminga":
            setView(
                registrationComplete,
                "styles/css/registrationComplete.css",
                data
            );
            break;

        case "prisijungimas":
            setView(login, "styles/css/login.css", data);
            break;

        case "klaida":
            setView(errorView, "styles/css/error.css", data);
            break;

        case "darbuotojo_darbalaukis":
            setMainStyle("styles/css/employeeDashboard.css");
            (async () => {
                const dashboard = await importProtectedView(
                    "../views/employee_views/dashboard.js"
                );
                const { view, viewDidMount } = dashboard(data);
                mainElement.append(view);
                viewDidMount();

                const employeeChart = await importProtectedView(
                    "../views/components/employeeChart.js"
                );
                employeeChart("statisticsChart");
            })();
            break;
        case "darbuotojo_registracijos":
            setProtectedView(
                "../views/employee_views/registrations.js",
                "styles/css/employeeRegistrations.css",
                data
            );
            break;
        case "darbuotojo_paslaugos":
            setProtectedView(
                "../views/employee_views/services.js",
                "styles/css/employeeServices.css",
                data
            );
            break;
        case "darbuotojo_nustatymai":
            setProtectedView(
                "../views/employee_views/settings.js",
                "styles/css/employeeSettings.css",
                data
            );
            break;
        case "darbuotojas_prideti_registracija":
            setProtectedView(
                "../views/employee_views/addRegistration.js",
                "styles/css/employeeAddRegistration.css",
                data
            );
            break;
        case "darbuotojas_prideti_paslauga":
        case "darbuotojas_atnaujinti_paslauga":
            setProtectedView(
                "../views/employee_views/addService.js",
                "styles/css/employeeAddService.css",
                data
            );
            break;
    }
};

export default render;
