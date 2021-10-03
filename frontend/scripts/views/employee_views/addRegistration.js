import route from "../../modules/route.js";
import employeeNav from "../components/employeeNav.js";
import {
    displayError,
    displayWarning,
    displayInfo,
    displaySuccess,
} from "../components/alerts.js";

import {
    GET_ALL_SERVICES_URI,
    GET_FREE_REGISTRATION_DATES_AND_TIMES_URI,
    ADD_NEW_REGISTRATION_URI,
} from "../../utils/endpoints.js";

const employeeAddRegistration = (data = {}) => {
    let employeeAddRegistration = document.createElement("div");
    employeeAddRegistration.id = "employee-add-registration";
    employeeAddRegistration.innerHTML =
        /*html*/
        `
        <div class='add-reg'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Pridėti registraciją</span></h2>
            </div>
            <div class="add-reg__content">
                <div class="add-reg__goback-button-row">
                    <button class='add-reg__goback-button' id='goback-button'>
                        <img src="./styles/images/icons/Feather-arrows-arrow-left.svg.png" alt="" />
                        Grižti atgal
                    </button>
                </div>
                <div class="add-reg__info-box">
                    <img src="styles/images/icons/information-button.png" alt="" />
                    <p>Pridėjus registraciją klientui nurodytų el. paštu bus išsiųstas pranešimas su vizito informacija</p>
                </div>
                <form class="add-reg__form">
                    <div class='label-input-group'>
                        <label for='name-input'>Vardas</label>
                        <input type="text" id='name-input' placeholder='Vardenis' />
                    </div>
                    <div class='label-input-group'>
                        <label for='surname-input'>Pavardė <span class="text-c-grey">(Nebūtina)</span></label>
                        <input type="text" id='surname-input' placeholder='Pavardenis' />
                    </div>
                    <div class='label-input-group'>
                        <label for='email-input'>El. pašto adresas</label>
                        <input type="text" id='email-input' placeholder='El. pašto adresas' />
                    </div>
                    <div class='label-input-group'>
                        <label for='phone-input'>Telefono numeris</label>
                        <input type="text" id='phone-input' placeholder='+37064444444' />
                    </div>
                    <p>Rodomos paslaugos iš jūsų teikiamų paslaugų sąrašo</p>
                    <div class='label-input-group'>
                        <label for='service-input'>Pasirinkti paslaugą</label>
                        <select id="service-input" disabled>
                            <option value=""></option>
                        </select>
                    </div>
                    <p>Pasirinkti data ir laiką:</p>
                    <div class='date-and-time-select-row'>
                        <div class='label-input-group'>
                            <label for='date-time-select'>Data ir laikas</label>
                            <select id="date-time-select" disabled>
                                <option>-</option>
                            </select>
                        </div>
                    </div>
                    <div class='label-input-group'>
                        <label for='payment-select'>Atsiskaitymo būdas</label>
                        <select id="payment-select">
                            <option value="1">Grynais</option>
                        </select>
                    </div>
                    <div class='registration__button-row'>
                        <button id='submit-registration-button' class='btn btn-md btn-spring-green-light'>Pateikti</button>
                    </div>
                </form>
            </div>
        </div>
        `;

    const goBackButton =
        employeeAddRegistration.querySelector("#goback-button");

    const serviceSelectElem =
        employeeAddRegistration.querySelector("#service-input");
    const dateTimeSelectElem =
        employeeAddRegistration.querySelector("#date-time-select");
    const submitRegistrationButton = employeeAddRegistration.querySelector(
        "#submit-registration-button"
    );
    const employeeID = data.user._id;
    const employee = data.user;
    let dateTimeSlots = [];

    const fetchServices = async () => {
        return await axios
            .get(GET_ALL_SERVICES_URI)
            .then((res) => res.data.services)
            .catch((err) => {
                displayError(
                    "Įvyko klaida nepavyko užkrauti paslaugų sąrašo.",
                    employeeAddRegistration.querySelector(".add-reg__content"),
                    employeeAddRegistration.querySelector(".add-reg__form")
                );
            });
    };

    const fetchFreeRegistrationDatesAndTimes = async (serviceID) => {
        return await axios
            .post(GET_FREE_REGISTRATION_DATES_AND_TIMES_URI, {
                employeeID: employeeID,
                serviceID: serviceID,
            })
            .then((res) => res.data.freeDatesAndTimes)
            .catch((err) => {
                displayError(
                    "Įvyko klaida nepavyko užkrauti galimų registracijos laikų.",
                    employeeAddRegistration.querySelector(".add-reg__content"),
                    employeeAddRegistration.querySelector(".add-reg__form")
                );
            });
    };

    const displayServiceSelection = async () => {
        let services = await fetchServices();
        services = services.filter((service) =>
            employee.serviceList.find(
                (eService) =>
                    eService.serviceID == service._id &&
                    eService.serviceAvailable
            )
        );
        serviceSelectElem.disabled = false;
        serviceSelectElem.innerHTML = /*html*/ `<option value="">-</option>`;
        services.forEach((service) => {
            serviceSelectElem.innerHTML +=
                /*html*/
                `<option value="${service._id}">${service.title}</option>`;
        });
    };

    const displayFreeRegistrationDatesAndTimesSelection = async (serviceID) => {
        dateTimeSelectElem.innerHTML = /*html*/ `<option value="">Prašome palaukti, kraunama...</option>`;
        const freeDatesAndTimes = await fetchFreeRegistrationDatesAndTimes(
            serviceID
        );
        if (!freeDatesAndTimes.length) {
            displayInfo(
                "Šiuo metu nėra laisvo registracijos laiko pagal pasirinkta meistrą ir paslaugą.",
                employeeAddRegistration.querySelector(".add-reg__content"),
                employeeAddRegistration.querySelector(".add-reg__form")
            );
            return;
        }
        dateTimeSelectElem.disabled = false;
        dateTimeSelectElem.innerHTML = /*html*/ `<option value="">-</option>`;
        freeDatesAndTimes.forEach((dateTime) => {
            let startDate = new Date(dateTime.startDate);
            let endDate = new Date(dateTime.endDate);
            dateTimeSlots.push(dateTime.slotIDs);

            const dtYear = startDate.getFullYear();
            const dtMonth = ("0" + (startDate.getMonth() + 1)).slice(-2);
            const dtDay = ("0" + startDate.getDate()).slice(-2);

            const dtStartHour = ("0" + startDate.getHours()).slice(-2);
            const dtStartMin = ("0" + startDate.getMinutes()).slice(-2);
            const dtEndHour = ("0" + endDate.getHours()).slice(-2);
            const dtEndMin = ("0" + endDate.getMinutes()).slice(-2);

            const optionText = /*html*/ `${dtYear}-${dtMonth}-${dtDay} ${dtStartHour}:${dtStartMin}-${dtEndHour}:${dtEndMin}`;

            dateTimeSelectElem.innerHTML +=
                /*html*/
                `<option>${optionText}</option>`;
        });
    };

    const handleServiceSelect = async (e) => {
        if (e.target.value) {
            const serviceID = e.target.value;
            displayFreeRegistrationDatesAndTimesSelection(serviceID);
        }
    };

    const handleRegistrationFormSubmit = async (e) => {
        e.preventDefault();
        // * cus - customer
        const cusName =
            employeeAddRegistration.querySelector("#name-input").value;
        const cusSurname =
            employeeAddRegistration.querySelector("#surname-input").value;
        const cusEmail =
            employeeAddRegistration.querySelector("#email-input").value;
        const cusPhone =
            employeeAddRegistration.querySelector("#phone-input").value;

        if (!cusName || !cusEmail || !cusPhone) {
            displayWarning(
                "Prašome užpildyti visus prašomus formos laukelius.",
                employeeAddRegistration.querySelector(".add-reg__content"),
                employeeAddRegistration.querySelector(".add-reg__form")
            );
            return;
        }
        if (
            !serviceSelectElem.selectedIndex ||
            !dateTimeSelectElem.selectedIndex
        ) {
            displayWarning(
                "Prašome pasirinkti paslaugą, vizito datą ir laiką.",
                employeeAddRegistration.querySelector(".add-reg__content"),
                employeeAddRegistration.querySelector(".add-reg__form")
            );
            return;
        }
        if (!dateTimeSlots.length) {
            displayError(
                "Atsiprašome, tačiau šiuo metu laisvų registracijos vietų nėra.",
                employeeAddRegistration.querySelector(".add-reg__content"),
                employeeAddRegistration.querySelector(".add-reg__form")
            );
            return;
        }
        const newRegistration = {
            customer: {
                name: cusName,
                surname: cusSurname,
                email: cusEmail,
                phone: cusPhone,
            },
            employeeID: employeeID,
            serviceID: serviceSelectElem.value,
            timeSlots: dateTimeSlots[dateTimeSelectElem.selectedIndex - 1],
            payMethod: 0,
            paid: false,
            visitStatus: 0,
        };
        await axios
            .post(ADD_NEW_REGISTRATION_URI, newRegistration)
            .then((res) => {
                displaySuccess(
                    "Registracija sėkmingai pridėta",
                    employeeAddRegistration.querySelector(".add-reg__content"),
                    employeeAddRegistration.querySelector(".add-reg__form")
                );
                clearRegistrationForm();
            })
            .catch((err) => {
                displayError(
                    err.response.data.message,
                    employeeAddRegistration.querySelector(".add-reg__content"),
                    employeeAddRegistration.querySelector(".add-reg__form")
                );
            });
    };

    const clearRegistrationForm = () => {
        employeeAddRegistration.querySelector("#name-input").value = "";
        employeeAddRegistration.querySelector("#surname-input").value = "";
        employeeAddRegistration.querySelector("#email-input").value = "";
        employeeAddRegistration.querySelector("#phone-input").value = "";
        dateTimeSelectElem.innerHTML = /*html*/ `<option value="">-</option>`;
        serviceSelectElem.innerHTML = /*html*/ `<option value="">-</option>`;
        serviceSelectElem.selectedIndex = 0;
        dateTimeSelectElem.selectedIndex = 0;
    };

    const mountView = () => {
        employeeAddRegistration.insertBefore(
            employeeNav(),
            employeeAddRegistration.querySelector(".add-reg")
        );

        goBackButton.addEventListener("click", () => {
            route("/darbuotojo_registracijos", {}, unmountView);
        });

        submitRegistrationButton.addEventListener(
            "click",
            handleRegistrationFormSubmit
        );
    };

    const viewDidMount = () => {
        displayServiceSelection();
        serviceSelectElem.addEventListener("change", handleServiceSelect);
    };

    const unmountView = () => {
        goBackButton.removeEventListener("click", route);
        submitRegistrationButton.removeEventListener(
            "click",
            handleRegistrationFormSubmit
        );
        serviceSelectElem.removeEventListener("change", handleServiceSelect);
    };

    // - Events

    mountView();

    return { view: employeeAddRegistration, viewDidMount: viewDidMount };
};

export default employeeAddRegistration;
