import route from "../modules/route.js";
import {
    displayError,
    displayWarning,
    displaySuccess,
    displayInfo,
} from "./components/alerts.js";
import {
    GET_ALL_EMPLOYEES_URI,
    GET_ALL_SERVICES_URI,
    GET_FREE_REGISTRATION_DATES_AND_TIMES_URI,
    ADD_NEW_REGISTRATION_URI,
} from "../utils/endpoints.js";

const registration = (data = {}) => {
    let registration = document.createElement("div");
    registration.id = "registration-content";
    registration.innerHTML =
        /*html*/
        `
        <section class='registration-section container'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Registracija vizitui</span></h2>
            </div>
            <div class='registration__form-box'>
                <form id='registration__form'>
                    <div class='label-input-group'>
                        <label for='name-input'>Vardas</label>
                        <input type="text" id='name-input' placeholder='' />
                    </div>
                    <div class='label-input-group'>
                        <label for='surname-input'>Pavardė</label>
                        <input type="text" id='surname-input' placeholder='' />
                    </div>
                    <div class='label-input-group'>
                        <label for='email-input'>El. pašto adresas</label>
                        <input type="email" id='email-input' placeholder='' />
                    </div>
                    <div class='label-input-group'>
                        <label for='phone-input'>Telefono numeris</label>
                        <input type="text" id='phone-input' placeholder='+370' />
                    </div>
                    <div class='label-input-group'>
                        <label for='master-input'>Pasirinkti meistrą</label>
                        <select id="master-input">
                            <option value="">-</option>
                        </select>
                    </div>
                    <div class='label-input-group'>
                        <label for='service-input'>Pasirinkti paslaugą</label>
                        <select id="service-input" disabled>
                            <option value="">-</option>
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
                            <option value="1" selected>Grynais</option>
                        </select>
                    </div>
                    <div class='registration__button-row'>
                        <button id='submit-registration-button' class='btn btn-md btn-gold-bg-dark'>Pateikti</button>
                    </div>
                </form>
            </div>
        </section>
        `;

    const employeeSelectElem = registration.querySelector("#master-input");
    const serviceSelectElem = registration.querySelector("#service-input");
    const dateTimeSelectElem = registration.querySelector("#date-time-select");
    const submitRegistrationButton = registration.querySelector(
        "#submit-registration-button"
    );
    let employeeArr = [];
    let dateTimeSlots = [];

    const fetchServices = async () => {
        return await axios
            .get(GET_ALL_SERVICES_URI)
            .then((res) => res.data.services)
            .catch((err) => {
                displayError(
                    "Įvyko klaida nepavyko užkrauti paslaugų sąrašo.",
                    services.querySelector(".registration__form-box"),
                    services.querySelector("#registration__form")
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
                    services.querySelector(".registration__form-box"),
                    services.querySelector("#registration__form")
                );
            });
    };
    const fetchFreeRegistrationDatesAndTimes = async (
        employeeID,
        serviceID
    ) => {
        return await axios
            .post(GET_FREE_REGISTRATION_DATES_AND_TIMES_URI, {
                employeeID: employeeID,
                serviceID: serviceID,
            })
            .then((res) => res.data.freeDatesAndTimes)
            .catch((err) => {
                displayError(
                    "Įvyko klaida nepavyko užkrauti galimų registracijos laikų.",
                    services.querySelector(".registration__form-box"),
                    services.querySelector("#registration__form")
                );
            });
    };

    const displayEmployeeSelection = async () => {
        employeeArr = await fetchEmployees();
        employeeSelectElem.innerHTML = /*html*/ `<option value="">-</option>`;
        employeeArr.forEach((employee) => {
            employeeSelectElem.innerHTML +=
                /*html*/
                `
                <option value="${employee._id}">${employee.name}</option>
                `;
        });
    };

    const displayServiceSelection = async (employeeID) => {
        let services = await fetchServices();
        const selectedEmployee = employeeArr.find(
            (employee) => employee._id == employeeID
        );
        services = services.filter((service) =>
            selectedEmployee.serviceList.find(
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

    const displayFreeRegistrationDatesAndTimesSelection = async (
        employeeID,
        serviceID
    ) => {
        dateTimeSelectElem.innerHTML = /*html*/ `<option value="">Prašome palaukti, kraunama...</option>`;
        const freeDatesAndTimes = await fetchFreeRegistrationDatesAndTimes(
            employeeID,
            serviceID
        );
        if (!freeDatesAndTimes.length) {
            displayInfo(
                "Šiuo metu nėra laisvo registracijos laiko pagal pasirinkta meistrą ir paslaugą.",
                registration.querySelector("#registration__form"),
                registration.querySelector(".date-and-time-select-row")
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

    const handleEmployeeSelect = async (e) => {
        if (e.target.value) {
            const employeeID = e.target.value;
            displayServiceSelection(employeeID);
        } else serviceSelectElem.disabled = true;
    };

    const handleServiceSelect = async (e) => {
        if (e.target.value) {
            const serviceID = e.target.value;
            const employeeID = employeeSelectElem.value;
            displayFreeRegistrationDatesAndTimesSelection(
                employeeID,
                serviceID
            );
        }
    };

    const handleRegistrationFormSubmit = async (e) => {
        e.preventDefault();
        // * cus - customer
        const cusName = registration.querySelector("#name-input").value;
        const cusSurname = registration.querySelector("#surname-input").value;
        const cusEmail = registration.querySelector("#email-input").value;
        const cusPhone = registration.querySelector("#phone-input").value;

        if (!cusName || !cusSurname || !cusEmail || !cusPhone) {
            displayWarning(
                "Prašome užpildyti visus formos laukelius.",
                registration.querySelector(".registration__form-box"),
                registration.querySelector("#registration__form")
            );
            return;
        }
        if (
            !employeeSelectElem.selectedIndex ||
            !serviceSelectElem.selectedIndex ||
            !dateTimeSelectElem.selectedIndex
        ) {
            displayWarning(
                "Prašome pasirinkti meistrą, paslaugą, vizito datą ir laiką.",
                registration.querySelector(".registration__form-box"),
                registration.querySelector("#registration__form")
            );
            return;
        }
        if (!dateTimeSlots.length) {
            displayError(
                "Atsiprašome, tačiau šiuo metu laisvų registracijos vietų nėra.",
                registration.querySelector(".registration__form-box"),
                registration.querySelector("#registration__form")
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
            employeeID: employeeSelectElem.value,
            serviceID: serviceSelectElem.value,
            timeSlots: dateTimeSlots[dateTimeSelectElem.selectedIndex - 1],
            payMethod: 0,
            paid: false,
            visitStatus: 0,
        };
        await axios
            .post(ADD_NEW_REGISTRATION_URI, newRegistration)
            .then((res) => {
                route(
                    "/registracija_sekminga",
                    { registrationData: res.data },
                    unmountView
                );
            })
            .catch((err) => {
                displayError(
                    err.response.data.message,
                    registration.querySelector(".registration__form-box"),
                    registration.querySelector("#registration__form")
                );
            });
    };

    const mountView = () => {
        submitRegistrationButton.addEventListener(
            "click",
            handleRegistrationFormSubmit
        );
    };

    const viewDidMount = () => {
        displayEmployeeSelection();
        employeeSelectElem.addEventListener("change", handleEmployeeSelect);
        serviceSelectElem.addEventListener("change", handleServiceSelect);
    };

    const unmountView = () => {
        submitRegistrationButton.removeEventListener(
            "click",
            handleRegistrationFormSubmit
        );
    };

    // - Events

    mountView();

    return { view: registration, viewDidMount: viewDidMount };
};

export default registration;
