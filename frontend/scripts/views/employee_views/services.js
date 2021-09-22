import route from "../../modules/route.js";
import employeeNav from "../components/employeeNav.js";
import {
    EMPLOYEE_GET_OWN_SERVICES_URI,
    GET_USER_URI,
    UPDATE_USER_URI,
} from "../../utils/endpoints.js";

const employeeServices = (data = {}) => {
    let employeeServices = document.createElement("div");
    employeeServices.id = "employee-services";
    employeeServices.innerHTML =
        /*html*/
        `
        <div class='services'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Teikiamos paslaugos</span></h2>
            </div>
            <div class="services__content">
                <div class="services__add-service-row">
                    <button class='add-service__button' id='add-service-button'>
                        <img src="./styles/images/icons/round-add-button.png" alt="" />
                        Pridėti teikiamą paslaugą
                    </button>
                </div>
                <div class="services__headings">
                    <div class="headings__left">
                        <div class="heading__service">Paslauga</div>
                        <div class="heading__duration">Trukmė</div>
                        <div class="heading__price">Kaina</div>
                    </div>
                    <div class="headings__right">
                        <div class="heading__actions">Veiksmai</div>
                    </div>
                </div>
                <div class="services__rows">
                </div>
            </div>
        </div>
        `;

    console.log("services inside function action");

    // - Variables

    const addServiceButton = employeeServices.querySelector(
        "#add-service-button"
    );

    const serviceListElem = employeeServices.querySelector(".services__rows");

    // - Functions

    const getEmployeeServices = async (URI) => {
        return await axios.get(URI, data.authHeader);
    };
    const displayEmployeeServices = (serviceArr) => {
        serviceListElem.innerHTML = "";
        serviceListElem.innerHTML = serviceArr.reduce(
            (HTMLContent, serviceObj, index) =>
                /*html*/ (HTMLContent += `
                <div class="service__row">
                    <div class="service__label 
                    ${
                        serviceObj.serviceAvailable
                            ? "label--active"
                            : "label--inactive"
                    }">
                        #${index + 1}
                    </div>
                    <div class="service__body ${
                        serviceObj.serviceAvailable
                            ? "service--active"
                            : "service--inactive"
                    }">
                        <div class="service__subbody">
                            <div class="service__title">${
                                serviceObj.title
                            }</div>
                            <div class="service__duration">${
                                serviceObj.duration
                            }</div>
                            <div class="service__price">${
                                serviceObj.price
                            } &euro;</div>
                        </div>
                        <div class="service__actions">
                            <button class="service__action-button action-btn--edit" data-service-id="${
                                serviceObj._id
                            }">
                                <img src="./styles/images/icons/edit.png" alt="" />
                                Redaguoti
                            </button>
                            <button class="service__action-button action-btn--delete" data-service-id="${
                                serviceObj._id
                            }">
                                <img src="./styles/images/icons/trash.png" alt="" />
                                Pašalinti
                            </button>

                            <div class="actions__status-input-group">
                                <label>Rodyti paslaugų<br/>sąraše</label>
                                <input class="action-service-available" type="checkbox" ${
                                    serviceObj.serviceAvailable && "checked"
                                } data-service-id="${serviceObj._id}"/>
                            </div>
                        </div>
                    </div>
                </div>`),
            ""
        );
        const editButtons =
            serviceListElem.querySelectorAll(".action-btn--edit");
        const deleteButtons = serviceListElem.querySelectorAll(
            ".action-btn--delete"
        );
        const availableButtons = serviceListElem.querySelectorAll(
            ".action-service-available"
        );

        editButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => editServiceButtonHandle(e));
        });
        deleteButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => deleteServiceButtonHandle(e));
        });
        availableButtons.forEach((btn) => {
            btn.addEventListener("click", (e) =>
                changeServiceAvailabilityButtonHandle(e)
            );
        });
    };

    const renderUserServices = async () => {
        const serviceArr = (
            await getEmployeeServices(EMPLOYEE_GET_OWN_SERVICES_URI)
        ).data.serviceArray;
        displayEmployeeServices(serviceArr);
    };

    const editServiceButtonHandle = (e) => {
        route(
            "/darbuotojas_prideti_paslauga",
            { serviceID: e.target.dataset.serviceId },
            unmountView
        );
    };
    const deleteServiceButtonHandle = async (e) => {
        const user = (await axios.get(GET_USER_URI, data.authHeader)).data;
        const serviceToDeleteID = e.target.dataset.serviceId;
        user.serviceList = user.serviceList.filter(
            (service) => service.serviceID !== serviceToDeleteID
        );
        await axios.put(UPDATE_USER_URI, { user: user }, data.authHeader);
        renderUserServices();
    };
    const changeServiceAvailabilityButtonHandle = async (e) => {
        const user = (await axios.get(GET_USER_URI, data.authHeader)).data;
        const serviceToEditID = e.target.dataset.serviceId;
        const visibility = e.target.checked;
        user.serviceList = user.serviceList.map((service) => {
            if (service.serviceID === serviceToEditID)
                service.serviceAvailable = visibility ? true : false;
            return service;
        });
        await axios.put(UPDATE_USER_URI, { user: user }, data.authHeader);
        renderUserServices();
    };

    const mountView = () => {
        employeeServices.insertBefore(
            employeeNav(),
            employeeServices.querySelector(".services")
        );
        addServiceButton.addEventListener("click", () =>
            route(
                "/darbuotojas_prideti_paslauga",
                { serviceID: 0 },
                unmountView
            )
        );
    };

    const viewDidMount = () => {
        renderUserServices();
        console.log(data.user);
    };

    const unmountView = () => {
        addServiceButton.removeEventListener("click", route);
    };

    // - Events

    mountView();

    return { view: employeeServices, viewDidMount: viewDidMount };
};

export default employeeServices;
