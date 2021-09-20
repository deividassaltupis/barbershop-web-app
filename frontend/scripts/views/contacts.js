import route from "../modules/route.js";
import {
    displayError,
    displayWarning,
    displaySuccess,
} from "./components/alerts.js";

const contacts = (data = {}) => {
    let contacts = document.createElement("div");
    contacts.id = "contacts-content";
    contacts.innerHTML =
        /*html*/
        `
        <section class='contacts-info-section container'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Kontaktai</span></h2>
            </div>

            <div class="contacts-info__content">
                <div class="contacts-image-box">
                    <img src="styles/images/barbershop.jpg" alt="" />
                </div>
                <p class='info-text' id='company-name'>UAB "Oldschool Barbershop"</p>
                <div class='info-row'>
                    <p class='info-heading'>Adresas</p>
                    <p class='info-value'>vilniaus g. 11, Vilnius, 13185</p>
                </div>
                <div class='info-row'>
                    <p class='info-heading'>Telefono numeris:</p>
                    <p class='info-value'>+37011155555</p>
                </div>
                <div class='info-row'>
                    <p class='info-heading'>Darbo laikas:</p>
                    <p class='info-value'>10:00 - 22:00 (I-V)  12:00 - 17:00 (VI-VII)</p>
                </div>
                <div class='info-row'>
                    <p class='info-heading'>Įmonės kodas:</p>
                    <p class='info-value'>8418148418418</p>
                </div>
                <div class='info-row'>
                    <p class='info-heading'>El. paštas:</p>
                    <p class='info-value'>info@oldschoolbarbershop.lt</p>
                </div>
            </div>
        </section>

        <section class='contacts-form-section container'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Susisiekti el. paštu</span></h2>
            </div>
            <form class="contacts-form__form" id='contacts-form'>
                <div class='form__row'>
                    <div class='label-input-group'>
                        <label for='name-input'>Vardas</label>
                        <input type="text" id='name-input'  />
                    </div>
                    <div class='label-input-group'>
                        <label for='surname-input'>Pavardė</label>
                        <input type="text" id='surname-input'  />
                    </div>
                </div>
                <div class='form__row'>
                    <div class='label-input-group'>
                        <label for='email-input'>El. pašto adresas</label>
                        <input type="text" id='email-input' />
                    </div>
                    <div class='label-input-group'>
                        <label for='phone-input'>Telefono numeris</label>
                        <input type="text" id='phone-input' />
                    </div>
                </div>
                <div class='label-input-group'>
                    <label for='message-input'>Pranešimas</label>
                    <textarea type="text" id='message-input'></textarea>
                </div>
                <button class='btn btn-md btn-grey'>Pateikti</button>
            </form>
        </section>
        `;

    displayError(
        "Įvyko klaida nepavyko prisijungti prie serverio",
        contacts.querySelector(".contacts-form-section"),
        contacts.querySelector("#contacts-form")
    );
    displayWarning(
        "Prašome užpildyti visus formos laukelius",
        contacts.querySelector(".contacts-form-section"),
        contacts.querySelector("#contacts-form")
    );
    displaySuccess(
        "Success message display",
        contacts.querySelector(".contacts-form-section"),
        contacts.querySelector("#contacts-form")
    );

    const mountView = () => {};

    const viewDidMount = () => {};

    const unmountView = () => {};

    // - Events

    mountView();

    return { view: contacts, viewDidMount: viewDidMount };
};

export default contacts;
