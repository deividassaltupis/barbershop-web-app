import route from "../modules/route.js";

const services = (data = {}) => {
    let services = document.createElement("div");
    services.id = "registration-content";
    services.innerHTML =
        /*html*/
        `
        <section class='services-section container'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Paslaugos</span></h2>
            </div>
            <div class="services__list">

                <div class="services__service-box">
                    <div class="services__service-heading-box">
                        <div class="services__service-icon">
                            <img src="styles/images/icons/hairdressing-scissors.png" alt="" />
                        </div>
                        <span class='services__service-heading'>Vyriškas kirpimas</span>
                    </div>
                    <div class='services__service-info'>
                        <div class='services__services-info-row'>
                            <span class='services__service-info-title'>Trukmė:</span>
                            <span class='services__service-info-value'>60 min</span>
                        </div>
                        <div class='services__services-info-row'>
                            <span class='services__service-info-title'>Kaina:</span>
                            <span class='services__service-info-value'>20 &euro;</span>
                        </div>
                        <div class='services__services-info-row'>
                            <span class='services__service-info-title'>Paslauga teikia:</span>
                            <span class='services__service-info-value'>Kamila, Eduard</span>
                        </div>
                    </div>
                </div>

                <div class="services__service-box">
                    <div class="services__service-heading-box">
                        <div class="services__service-icon">
                            <img src="styles/images/icons/hairdressing-scissors.png" alt="" />
                        </div>
                        <span class='services__service-heading'>PLAUKŲ KIRPIMAS IR BARZDOS MODELIAVIMAS 
                        NAUDOJANT KARŠTUS RANKŠLUOSČIUS </span>
                    </div>
                    <div class='services__service-info'>
                        <div class='services__services-info-row'>
                            <span class='services__service-info-title'>Trukmė:</span>
                            <span class='services__service-info-value'>1h 20 min</span>
                        </div>
                        <div class='services__services-info-row'>
                            <span class='services__service-info-title'>Kaina:</span>
                            <span class='services__service-info-value'>35 &euro;</span>
                        </div>
                        <div class='services__services-info-row'>
                            <span class='services__service-info-title'>Paslauga teikia:</span>
                            <span class='services__service-info-value'>Eduard, Evelina, Ieva, Tatjana, Egle, Silvija</span>
                        </div>
                    </div>
                </div>

            </div>
            <div class='services__row'>
                <button id='linkToRegistration' class='btn btn-lg btn-spring-green-light'>Registruotis vizitui</button>
            </div>
        </section>
        `;

    services
        .querySelector("#linkToRegistration")
        .addEventListener("click", () => route("/registracija"));

    const mountView = () => {};

    const viewDidMount = () => {};

    const unmountView = () => {};

    // - Events

    mountView();

    return { view: services, viewDidMount: viewDidMount };
};

export default services;
