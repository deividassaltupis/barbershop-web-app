import {
    displayError,
    displayWarning,
    displaySuccess,
} from "./components/alerts.js";

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
                        <input type="text" id='name-input' placeholder='Vardenis' />
                    </div>
                    <div class='label-input-group'>
                        <label for='surname-input'>Pavardė</label>
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
                    <div class='label-input-group'>
                        <label for='master-input'>Pasirinkti meistrą</label>
                        <select id="master-input">
                            <option value="1">Ferdinand</option>
                            <option value="2">Evelina</option>
                        </select>
                    </div>
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
                        <button id='submit-registration-button' class='btn btn-md btn-gold-bg-dark'>Pateikti</button>
                    </div>
                </form>
            </div>
        </section>
        `;

    displayError(
        "Įvyko klaida nepavyko prisijungti prie serverio",
        registration.querySelector(".registration__form-box"),
        registration.querySelector("#registration__form")
    );
    displayWarning(
        "Prašome užpildyti visus formos laukelius",
        registration.querySelector(".registration__form-box"),
        registration.querySelector("#registration__form")
    );
    displaySuccess(
        "Registracija sėkmingai pateikta",
        registration.querySelector(".registration__form-box"),
        registration.querySelector("#registration__form")
    );

    registration
        .querySelector("#submit-registration-button")
        .addEventListener("click", (e) => {
            e.preventDefault();
        });

    const mountView = () => {};

    const viewDidMount = () => {};

    const unmountView = () => {};

    // - Events

    mountView();

    return { view: registration, viewDidMount: viewDidMount };
};

export default registration;
