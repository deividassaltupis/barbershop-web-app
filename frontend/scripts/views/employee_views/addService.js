import route from "../../modules/route.js";
import employeeNav from "../components/employeeNav.js";
import { displayError, displayWarning } from "../components/alerts.js";

const employeeAddService = (data = {}) => {
    let employeeAddService = document.createElement("div");
    employeeAddService.id = "employee-add-service";
    employeeAddService.innerHTML =
        /*html*/
        `
        <div class='add-service'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Pridėti teikiamą paslaugą</span></h2>
            </div>
            <div class="add-service__content">

                <div class="add-service__goback-button-row">
                    <button class='add-service__goback-button' id='goback-button'>
                        <img src="./styles/images/icons/Feather-arrows-arrow-left.svg.png" alt="" />
                        Grižti atgal
                    </button>
                </div>

                <form class="add-service__form">
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
                            <option value="1">60 min</option>
                            <option value="1">1h 30 min</option>
                        </select>
                    </div>
                    <button class="btn-skyblue">${
                        data.serviceID ? "Atnaujinti" : "Pridėti"
                    }</button>
                </form>
            </div>
        </div>
        `;

    employeeAddService.insertBefore(
        employeeNav(),
        employeeAddService.querySelector(".add-service")
    );

    const goBackButton = employeeAddService.querySelector("#goback-button");
    goBackButton.addEventListener("click", () =>
        route("/darbuotojo_paslaugos")
    );

    const mountView = () => {};

    const viewDidMount = () => {};

    const unmountView = () => {};

    // - Events

    mountView();

    return { view: employeeAddService, viewDidMount: viewDidMount };
};

export default employeeAddService;
