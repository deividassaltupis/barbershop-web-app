import route from "../../modules/route.js";
import employeeNav from "../components/employeeNav.js";
import {
    displayError,
    displayWarning,
    displaySuccess,
    displayInfo,
} from "../components/alerts.js";
import {
    EMPLOYEE_ADD_SERVICE_URI,
    EMPLOYEE_GET_SINGLE_SERVICE_URI,
    EMPLOYEE_UPDATE_SINGLE_SERVICE_URI,
    GET_ALL_SERVICES_URI,
    UPDATE_USER_URI,
    EMPLOYEE_ADD_EXISTING_SERVICE_URI,
} from "../../utils/endpoints.js";

const employeeAddService = (data = {}) => {
    let employeeAddService = document.createElement("div");
    employeeAddService.id = "employee-add-service";
    employeeAddService.innerHTML =
        /*html*/
        `
        <div class='add-service'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>${
                    data.serviceID
                        ? "Redaguoti teikiamą paslaugą"
                        : "Pridėti teikiamą paslaugą"
                }</span></h2>
            </div>
            <div class="add-service__content">

                <div class="add-service__goback-button-row">
                    <button class='add-service__goback-button' id='goback-button'>
                        <img src="./styles/images/icons/Feather-arrows-arrow-left.svg.png" alt="" />
                        Grižti atgal
                    </button>
                </div>

                <form class="add-service__form" enctype="multipart/form-data">

                    <div class="radio-group">
                        <label for="">Pridėti esamą paslaugą</label>
                        <input type="radio" name="service-append-type" class="service-append-type" id="service-append-existing" 
                        ${data.serviceID && "disabled"}/>
                    </div>
                    <div class="input-group">
                        <label for="">Pridėti esamą paslaugą</label>
                        <select class="input-skyblue" id="existing-service-select" ${
                            data.serviceID && "disabled"
                        }>
                            <option value="" selected>-</option>
                        </select>
                    </div>

                    <div class="radio-group">
                        <label for="">${
                            data.serviceID
                                ? "Redaguoti paslaugą"
                                : "Pridėti naują paslaugą"
                        }</label>
                        <input type="radio" name="service-append-type" class="service-append-type" id="service-append-new" ${
                            data.serviceID && "checked"
                        }/>
                    </div>
                    <div class="input-group">
                        <label for="">Paslauga</label>
                        <input type="text" class="input-skyblue" id="service-title-input" placeholder="Vyriškas kirpimas" />
                    </div>
                    <div class="input-group">
                        <label for="">Kaina</label>
                        <input type="text" class="input-skyblue" id="service-price-input" placeholder="15.00" />
                    </div>
                    <div class="input-group">
                        <label for="">Trukmė</label>
                        <select class="input-skyblue" id="service-duration-select">
                            <option value="" selected>-</option>
                            <option value="1">30 min</option>
                            <option value="2">60 min</option>
                            <option value="3">1h 30 min</option>
                            <option value="4">2h 00 min</option>
                        </select>
                    </div>

                    <p class="add-service__icon-select-label">Pasirinkite paslaugos mini paveikslą rodymui paslaugų sąraše</p>
                    
                    <div class="add-service__icon-list">
                    </div>

                    <button class="btn-skyblue" id='add-edit-service-btn'>${
                        data.serviceID ? "Atnaujinti" : "Pridėti"
                    }</button>
                </form>
            </div>
        </div>
        `;

    const goBackButton = employeeAddService.querySelector("#goback-button");
    const addOrEditServiceButton = employeeAddService.querySelector(
        "#add-edit-service-btn"
    );

    const serviceTitle = employeeAddService.querySelector(
        "#service-title-input"
    );
    const servicePrice = employeeAddService.querySelector(
        "#service-price-input"
    );
    const serviceDuration = employeeAddService.querySelector(
        "#service-duration-select"
    );
    let selectedServiceIconID = 0;

    const serviceIconList = employeeAddService.querySelector(
        ".add-service__icon-list"
    );

    const existingServiceSelect = employeeAddService.querySelector(
        "#existing-service-select"
    );
    const serviceAppendTypeRadios = employeeAddService.querySelectorAll(
        ".service-append-type"
    );

    const validateForm = (title, price, durationIndex, serviceIcon) => {
        if (!title || !price) {
            displayWarning(
                "Prašome nurodyti paslaugos pavadinimą ir kainą.",
                employeeAddService.querySelector(".add-service__content"),
                employeeAddService.querySelector(".add-service__form")
            );
            return false;
        }

        if (!(durationIndex >= 1 && durationIndex <= 4)) {
            displayWarning(
                "Prašome pasirinkti paslaugos teikimo trukmę.",
                employeeAddService.querySelector(".add-service__content"),
                employeeAddService.querySelector(".add-service__form")
            );
            return false;
        }

        if (!serviceIcon) {
            displayWarning(
                "Prašome pasirinkti paslaugos reprezentatyvinį paveiksliuką.",
                employeeAddService.querySelector(".add-service__content"),
                employeeAddService.querySelector(".add-service__form")
            );
            return false;
        }
        return true;
    };

    const addServiceHandler = () => {
        const title = serviceTitle.value;
        const price = servicePrice.value;
        const durationSelectedIndex = serviceDuration.selectedIndex;

        if (
            !validateForm(
                title,
                price,
                durationSelectedIndex,
                selectedServiceIconID
            )
        )
            return;

        axios
            .post(
                EMPLOYEE_ADD_SERVICE_URI,
                {
                    title: title,
                    timeSlots: durationSelectedIndex,
                    price: price,
                    iconID: selectedServiceIconID,
                },
                data.authHeader
            )
            .then((res) => {
                displaySuccess(
                    res.data.message,
                    employeeAddService.querySelector(".add-service__content"),
                    employeeAddService.querySelector(".add-service__form")
                );
            })
            .catch((err) => {
                displayError(
                    err.response.data.message,
                    employeeAddService.querySelector(".add-service__content"),
                    employeeAddService.querySelector(".add-service__form")
                );
            });

        serviceTitle.value = "";
        servicePrice.value = "";
        serviceDuration.selectedIndex = 0;
        deselectIcon();
    };

    const editServiceHandler = (serviceID) => {
        const title = serviceTitle.value;
        const price = servicePrice.value;
        const durationSelectedIndex = serviceDuration.selectedIndex;

        if (
            !validateForm(
                title,
                price,
                durationSelectedIndex,
                selectedServiceIconID
            )
        )
            return;

        axios
            .put(
                EMPLOYEE_UPDATE_SINGLE_SERVICE_URI + serviceID,
                {
                    title: title,
                    timeSlots: durationSelectedIndex,
                    price: price,
                    iconID: selectedServiceIconID,
                },
                data.authHeader
            )
            .then((res) => {
                displaySuccess(
                    res.data.message,
                    employeeAddService.querySelector(".add-service__content"),
                    employeeAddService.querySelector(".add-service__form")
                );
            })
            .catch((err) => {
                displayError(
                    err.response.data.message,
                    employeeAddService.querySelector(".add-service__content"),
                    employeeAddService.querySelector(".add-service__form")
                );
            });
    };
    const addExistingServiceHandler = async () => {
        console.log("in action");
        if (
            !existingServiceSelect.selectedIndex ||
            !existingServiceSelect.value
        ) {
            displayWarning(
                "Prašome pasirinkti paslaugą iš egzistuojančių paslaugų sąrašo.",
                employeeAddService.querySelector(".add-service__content"),
                employeeAddService.querySelector(".add-service__form")
            );
            return;
        }

        data.user.serviceList.push({
            serviceID: existingServiceSelect.value,
            serviceAvailable: true,
        });

        await axios
            .post(
                EMPLOYEE_ADD_EXISTING_SERVICE_URI,
                { serviceID: existingServiceSelect.value },
                data.authHeader
            )
            .then((res) =>
                displaySuccess(
                    res.data.message,
                    employeeAddService.querySelector(".add-service__content"),
                    employeeAddService.querySelector(".add-service__form")
                )
            )
            .catch((err) =>
                displayError(
                    err.response.data.message,
                    employeeAddService.querySelector(".add-service__content"),
                    employeeAddService.querySelector(".add-service__form")
                )
            );
        loadExistingServices();
    };

    const deselectIcon = () => {
        employeeAddService
            .querySelector(`#icon-${selectedServiceIconID}`)
            .classList.remove("add-service__icon-box--selected");
        selectedServiceIconID = 0;
    };

    const handleIconSelect = (iconID) => {
        if (selectedServiceIconID)
            employeeAddService
                .querySelector(`#icon-${selectedServiceIconID}`)
                .classList.remove("add-service__icon-box--selected");
        selectedServiceIconID = iconID;
        employeeAddService
            .querySelector(`#icon-${iconID}`)
            .classList.add("add-service__icon-box--selected");
    };

    const loadAllServiceIcons = () => {
        const iconDest = "./styles/images/icons/service-icons/";
        const iconExt = ".png";
        const iconQuantity = 6;
        for (let i = 1; i <= iconQuantity; i++) {
            serviceIconList.innerHTML += /*html*/ `
            <div class="add-service__icon-box" id="icon-${i}" data-icon-id='${i}'>
                <img src="${iconDest + i + iconExt}" alt="" />
            </div>`;
        }
        const iconList = employeeAddService.querySelectorAll(
            ".add-service__icon-box"
        );
        iconList.forEach((icon) => {
            icon.addEventListener("click", () =>
                handleIconSelect(icon.dataset.iconId)
            );
        });
    };

    const fillFormInServiceEditMode = async (serviceID) => {
        const serviceData = (
            await axios.get(
                EMPLOYEE_GET_SINGLE_SERVICE_URI + serviceID,
                data.authHeader
            )
        ).data.serviceObj;
        serviceTitle.value = serviceData.title;
        servicePrice.value = serviceData.price;
        serviceDuration.selectedIndex = serviceData.timeSlots;
        handleIconSelect(serviceData.iconID);
    };

    const addOrEditServiceButtonHandler = (e) => {
        e.preventDefault();
        if (data.serviceID) editServiceHandler(data.serviceID);
        else {
            console.log(serviceAppendTypeRadios);
            for (const radio of serviceAppendTypeRadios) {
                console.log(radio);
                if (radio.id === "service-append-existing" && radio.checked) {
                    addExistingServiceHandler();
                    return;
                } else if (radio.id === "service-append-new" && radio.checked) {
                    addServiceHandler();
                    return;
                }
            }
            displayWarning(
                "Prašome užpildyti formą.",
                employeeAddService.querySelector(".add-service__content"),
                employeeAddService.querySelector(".add-service__form")
            );
        }
    };

    const loadExistingServices = async () => {
        let servicesArr = (await axios.get(GET_ALL_SERVICES_URI)).data.services;
        servicesArr = servicesArr.filter(
            (service) =>
                !data.user.serviceList.find(
                    (serviceRef) => serviceRef.serviceID === service._id
                )
        );
        existingServiceSelect.innerHTML = "";
        existingServiceSelect.innerHTML = '<option value="">-</option>';
        servicesArr.forEach((service) => {
            existingServiceSelect.innerHTML += `<option value='${service._id}'>${service.title}&nbsp;&nbsp;${service.duration}&nbsp;&nbsp;${service.price} &euro;</option>`;
        });
    };

    const mountView = () => {
        employeeAddService.insertBefore(
            employeeNav(),
            employeeAddService.querySelector(".add-service")
        );
        loadAllServiceIcons();

        if (!data.serviceID)
            displayInfo(
                "Sistemoje gali būti jau pridėtų paslaugų, kurias teikia kiti darbuotojai, jus galite jas pridėti į savo teikiamų paslaugų sąrašą, arba sukurti naują paslaugą.",
                employeeAddService.querySelector(".add-service__content"),
                employeeAddService.querySelector(".add-service__form")
            );

        goBackButton.addEventListener("click", () =>
            route("/darbuotojo_paslaugos", {}, unmountView)
        );
        addOrEditServiceButton.addEventListener("click", (e) =>
            addOrEditServiceButtonHandler(e)
        );
    };

    const viewDidMount = () => {
        if (data.serviceID) fillFormInServiceEditMode(data.serviceID);
        else loadExistingServices();
    };

    const unmountView = () => {
        goBackButton.removeEventListener("click", route);
    };

    // - Events

    mountView();

    return { view: employeeAddService, viewDidMount: viewDidMount };
};

export default employeeAddService;
