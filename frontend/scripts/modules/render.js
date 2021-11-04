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

import employeeDashboard from "../views/employee_views/dashboard.js";
import employeeAddRegistration from "../views/employee_views/addRegistration.js";
import employeeRegistrations from "../views/employee_views/registrations.js";
import employeeAddService from "../views/employee_views/addService.js";
import employeeServices from "../views/employee_views/services.js";
import employeeSettings from "../views/employee_views/settings.js";

import employeeChart from "../views/components/employeeChart.js";

import { initStyles } from "../modules/initStyles.js";

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

const setView = (viewFunc, data = {}) => {
    const { view, viewDidMount } = viewFunc(data);
    mainElement.append(view);
    viewDidMount();
};

const render = (page, data = {}) => {
    initStyles();

    initHeader(headerElement, { pageRoute: "/" + page });
    initFooter(footerElement, {});

    mainElement.innerHTML = "";
    setParam("page", page);

    switch (page) {
        case "pradzia":
            setView(home, data);
            break;

        case "paslaugos":
            setView(services, data);
            break;

        case "registracija":
            setView(registration, data);
            break;

        case "kontaktai":
            setView(contacts, data);
            break;

        case "404":
            setView(pageNotFound, data);
            break;

        case "pranesimas_issiustas":
            setView(contactsMessageSent, data);
            break;

        case "registracija_sekminga":
            setView(registrationComplete, data);
            break;

        case "prisijungimas":
            setView(login, data);
            break;

        case "klaida":
            setView(errorView, data);
            break;

        case "darbuotojo_darbalaukis":
            setView(employeeDashboard, data);
            employeeChart("statisticsChart", data.authHeader, data.user);
            break;
        case "darbuotojo_registracijos":
            setView(employeeRegistrations, data);
            break;
        case "darbuotojo_paslaugos":
            setView(employeeServices, data);
            break;
        case "darbuotojo_nustatymai":
            setView(employeeSettings, data);
            break;
        case "darbuotojas_prideti_registracija":
            setView(employeeAddRegistration, data);
            break;
        case "darbuotojas_prideti_paslauga":
        case "darbuotojas_atnaujinti_paslauga":
            setView(employeeAddService, data);
            break;
    }
};

export default render;
