import route from "../../modules/route.js";
import employeeNav from "../components/employeeNav.js";

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
                        <select id="service-input">
                            <option value="1">Vyriškas kirpimas</option>
                            <option value="2">Plaukų modeliavimas</option>
                        </select>
                    </div>
                    <p>Pasirinkti data ir laiką:</p>
                    <div class='date-and-time-select-row'>
                        <div class='label-input-group'>
                            <label for='year-select'>Metai</label>
                            <select id="year-select">
                                <option value="">Pasirinkti</option>
                                <option value="0">2021</option>
                                <option value="1">2022</option>
                            </select>
                        </div>
                        <div class='label-input-group'>
                            <label for='month-select'>Mėnuo</label>
                            <select id="month-select" disabled>
                                <option value="">-</option>
                                <option value="0">07</option>
                                <option value="1">08</option>
                                <option value="1">09</option>
                            </select>
                        </div>
                        <div class='label-input-group'>
                            <label for='day-select'>Diena</label>
                            <select id="day-select" disabled>
                                <option value="">-</option>
                                <option value="0">22</option>
                                <option value="1">23</option>
                            </select>
                        </div>
                        <div class='label-input-group'>
                            <label for='time-select'>Laikas</label>
                            <select id="time-select" disabled>
                                <option value="">-</option>
                                <option value="0">12:30 - 13:45</option>
                                <option value="1">13:45 - 14:30</option>
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

    employeeAddRegistration.insertBefore(
        employeeNav(),
        employeeAddRegistration.querySelector(".add-reg")
    );

    const goBackButton =
        employeeAddRegistration.querySelector("#goback-button");

    goBackButton.addEventListener("click", () => {
        route("/darbuotojo_registracijos");
    });

    const mountView = () => {};

    const viewDidMount = () => {};

    const unmountView = () => {};

    // - Events

    mountView();

    return { view: employeeAddRegistration, viewDidMount: viewDidMount };
};

export default employeeAddRegistration;
