import route from "../modules/route.js";
const registrationComplete = (data = {}) => {
    let registrationComplete = document.createElement("div");
    registrationComplete.id = "registered-content";
    registrationComplete.innerHTML =
        /*html*/
        `
        <section class='registered container'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Registracija sėkminga</span></h2>
            </div>
            <div class="registered__data-box">
                <p class="info-text">Jūsų registracija priimta</p>
                <div class='info-row'>
                    <p class='info-heading'>Vardas pavardė:</p>
                    <p class='info-value'>Vardenis pavardenis</p>
                </div>

                <div class='info-row'>
                    <p class='info-heading'>El.paštas:</p>
                    <p class='info-value'>klientopastas@gmail.com</p>
                </div>

                <div class='info-row'>
                    <p class='info-heading'>Tel. nr:</p>
                    <p class='info-value'>+370666666666</p>
                </div>

                <div class='info-row'>
                    <p class='info-heading'>Rezervuotas laikas:</p>
                    <p class='info-value'>13:30-14:15</p>
                </div>

                <div class='info-row'>
                    <p class='info-heading'>Pasirinktas meistras:</p>
                    <p class='info-value'>Ferdinand</p>
                </div>

                <div class='info-row'>
                    <p class='info-heading'>Pasirinkta paslauga:</p>
                    <p class='info-value'>Barzdos modeliavimas</p>
                </div>

                <div class='info-row'>
                    <p class='info-heading'>Kaina:</p>
                    <p class='info-value'>20 &euro;</p>
                </div>

                <div class='info-row'>
                    <p class='info-heading'>Apmokėjimo būdas:</p>
                    <p class='info-value'>Grynais</p>
                </div>

                <p class="info-text-center">Jeigu turite klausimų, arba norite pakeisti apsilankymo laiką kreipkites:</p>

                <h3 class="info-text-center">+3706484118415</h3>
                <p class="info-text-center">arba</p>
                <p class="info-text-center">masteremail@oldschoolbarbershop.lt</p>

                <button class="button-link" id='linkToHomePage'>Grižti į pradinį puslapį</button>
            </div>
        </section>
        `;

    registrationComplete
        .querySelector("#linkToHomePage")
        .addEventListener("click", () => route("/"));

    const mountView = () => {};

    const viewDidMount = () => {};

    const unmountView = () => {};

    // - Events

    mountView();

    return { view: registrationComplete, viewDidMount: viewDidMount };
};

export default registrationComplete;
