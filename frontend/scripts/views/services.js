import route from "../modules/route.js";
import {
    GET_ALL_EMPLOYEES_URI,
    GET_ALL_SERVICES_URI,
} from "../utils/endpoints.js";
import { displayError } from "./components/alerts.js";

const services = (data = {}) => {
    let services = document.createElement("div");
    services.id = "registration-content";
    services.innerHTML =
        /*html*/
        `
        <section class='services-section container'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Paslaugos</span></h2>
            </div>
            <div class="services__list">
            </div>
            <div class='services__row'>
                <button id='linkToRegistration' class='btn btn-lg btn-spring-green-light'>Registruotis vizitui</button>
            </div>
        </section>
        `;

    const serviceListElem = services.querySelector(".services__list");
    const registerButtonElem = services.querySelector("#linkToRegistration");

    const fetchServices = async () => {
        return await axios
            .get(GET_ALL_SERVICES_URI)
            .then((res) => res.data.services)
            .catch((err) => {
                displayError(
                    "Įvyko klaida nepavyko užkrauti paslaugų sąrašo.",
                    services.querySelector(".services-section"),
                    services.querySelector(".services__list")
                );
            });
    };
    const fetchEmployees = async () => {
        return await axios
            .get(GET_ALL_EMPLOYEES_URI)
            .then((res) => res.data.employees)
            .catch((err) => {
                displayError(
                    "Įvyko klaida nepavyko užkrauti paslaugų sąrašo.",
                    services.querySelector(".services-section"),
                    services.querySelector(".services__list")
                );
            });
    };

    const displayServices = async () => {
        const serviceArr = await fetchServices();
        const employeeArr = await fetchEmployees();

        serviceListElem.innerHTML = "";

        serviceArr.forEach((serviceObj) => {
            const serviceProvidedBy = [];
            employeeArr.forEach((employee) => {
                if (
                    employee.serviceList.find(
                        (eService) =>
                            eService.serviceID == serviceObj._id &&
                            eService.serviceAvailable
                    )
                )
                    serviceProvidedBy.push(employee.name);
            });
            if (serviceProvidedBy.length) {
                let employeeNames = serviceProvidedBy.reduce(
                    (eNames, eName, index, array) => {
                        return index == array.length - 1
                            ? eNames + eName
                            : eNames + eName + ", ";
                    },
                    ""
                );
                serviceListElem.innerHTML +=
                    /*html*/
                    `
                    <div class="services__service-box">
                            <div class="services__service-heading-box">
                                <div class="services__service-icon">
                                    <img src='./styles/images/icons/service-icons/${serviceObj.iconID}.png' alt="" />
                                </div>
                                <span class='services__service-heading'>${serviceObj.title}</span>
                            </div>
                            <div class='services__service-info'>
                                <div class='services__services-info-row'>
                                    <span class='services__service-info-title'>Trukmė:</span>
                                    <span class='services__service-info-value'>${serviceObj.duration}</span>
                                </div>
                                <div class='services__services-info-row'>
                                    <span class='services__service-info-title'>Kaina:</span>
                                    <span class='services__service-info-value'>${serviceObj.price} &euro;</span>
                                </div>
                                <div class='services__services-info-row'>
                                    <span class='services__service-info-title'>Paslauga teikia:</span>
                                    <span class='services__service-info-value'>${employeeNames}</span>
                                </div>
                            </div>
                        </div>
            `;
            }
        });

        if (!serviceListElem.innerHTML)
            serviceListElem.innerHTML +=
                /*html*/
                `
            <h3 class="text-center">Teikiamų paslaugų nerasta</h3>
            `;
    };

    const mountView = () => {
        registerButtonElem.addEventListener("click", () =>
            route("/registracija", {}, unmountView)
        );
    };

    const viewDidMount = () => {
        displayServices();
    };

    const unmountView = () => {
        registerButtonElem.removeEventListener("click", route);
    };

    // - Events

    mountView();

    return { view: services, viewDidMount: viewDidMount };
};

export default services;
