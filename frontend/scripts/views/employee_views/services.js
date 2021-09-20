import route from "../../modules/route.js";
import employeeNav from "../components/employeeNav.js";

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

                    <div class="service__row">
                        <div class="service__label label--active">#1</div>
                        <div class="service__body service--active">

                            <div class="service__subbody">
                                <div class="service__title">Vyriškas kirpimas</div>
                                <div class="service__duration">30 min</div>
                                <div class="service__price">20.00 &euro;</div>
                            </div>
                            <div class="service__actions">
                                <button class="service__action-button action-btn--edit">
                                    <img src="./styles/images/icons/edit.png" alt="" />
                                    Redaguoti
                                </button>
                                <button class="service__action-button action-btn--delete">
                                    <img src="./styles/images/icons/trash.png" alt="" />
                                    Pašalinti
                                </button>
                                <div class="actions__status-input-group">
                                    <label for="service__status">Rodyti paslaugų<br/>sąraše</label>
                                    <input type="checkbox" id="service__status" checked />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="service__row">
                        <div class="service__label label--inactive">#2</div>
                        <div class="service__body service--inactive">
                            <div class="service__subbody">
                                <div class="service__title">Vyriškas kirpimas + barzdos modeliavias. Plius proginė šukuosena</div>
                                <div class="service__duration">60 min</div>
                                <div class="service__price">20.00 &euro;</div>
                            </div>
                            <div class="service__actions">
                                <button class="service__action-button action-btn--edit">
                                    <img src="./styles/images/icons/edit.png" alt="" />
                                    Redaguoti
                                </button>
                                <button class="service__action-button action-btn--delete">
                                    <img src="./styles/images/icons/trash.png" alt="" />
                                    Pašalinti
                                </button>

                                <div class="actions__status-input-group">
                                    <label for="service__status">Rodyti paslaugų<br/>sąraše</label>
                                    <input type="checkbox" id="service__status" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        `;

    console.log("services inside function action");

    // - Variables

    const addServiceButton = employeeServices.querySelector(
        "#add-service-button"
    );

    // - Functions

    const mountView = () => {
        employeeServices.insertBefore(
            employeeNav(),
            employeeServices.querySelector(".services")
        );
    };

    const viewDidMount = () => {
        console.log("viewDidMount called");
    };

    const unmountView = () => {
        addServiceButton.removeEventListener("click", route);
    };

    // - Events

    mountView();

    addServiceButton.addEventListener("click", () =>
        route("/darbuotojas_prideti_paslauga", { serviceID: 0 }, unmountView)
    );

    return { view: employeeServices, viewDidMount: viewDidMount };
};

export default employeeServices;
