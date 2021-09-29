import route from "../modules/route.js";
const registrationComplete = (data = {}) => {
    let registrationComplete = document.createElement("div");
    registrationComplete.id = "registered-content";

    if (!data.registrationData) route("/");
    const regData = data.registrationData;
    const startDate = new Date(regData.startDate);
    const endDate = new Date(regData.endDate);

    const dtYear = startDate.getFullYear();
    const dtMonth = ("0" + (startDate.getMonth() + 1)).slice(-2);
    const dtDay = ("0" + startDate.getDate()).slice(-2);

    const dtStartHour = ("0" + startDate.getHours()).slice(-2);
    const dtStartMin = ("0" + startDate.getMinutes()).slice(-2);
    const dtEndHour = ("0" + endDate.getHours()).slice(-2);
    const dtEndMin = ("0" + endDate.getMinutes()).slice(-2);

    const visitDateTime = /*html*/ `${dtYear}-${dtMonth}-${dtDay} ${dtStartHour}:${dtStartMin}-${dtEndHour}:${dtEndMin}`;

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
                    <p class='info-value'>${regData.customer.name} ${regData.customer.surname}</p>
                </div>

                <div class='info-row'>
                    <p class='info-heading'>El.paštas:</p>
                    <p class='info-value'>${regData.customer.email}</p>
                </div>

                <div class='info-row'>
                    <p class='info-heading'>Tel. nr:</p>
                    <p class='info-value'>${regData.customer.phone}</p>
                </div>

                <div class='info-row'>
                    <p class='info-heading'>Rezervuota data ir laikas:</p>
                    <p class='info-value'>${visitDateTime}</p>
                </div>

                <div class='info-row'>
                    <p class='info-heading'>Pasirinktas meistras:</p>
                    <p class='info-value'>${regData.employeeName}</p>
                </div>

                <div class='info-row'>
                    <p class='info-heading'>Pasirinkta paslauga:</p>
                    <p class='info-value'>${regData.serviceTitle}</p>
                </div>

                <div class='info-row'>
                    <p class='info-heading'>Kaina:</p>
                    <p class='info-value'>${regData.servicePrice} &euro;</p>
                </div>

                <div class='info-row'>
                    <p class='info-heading'>Apmokėjimo būdas:</p>
                    <p class='info-value'>Grynais</p>
                </div>

                <p class="info-text-center">Jeigu turite klausimų, arba norite pakeisti apsilankymo laiką kreipkites:</p>

                <h3 class="info-text-center">+37000000000</h3>
                <p class="info-text-center">arba</p>
                <p class="info-text-center">elpastoadresas@gmail.com</p>

                <button class="button-link" id='linkToHomePage'>Grižti į pradinį puslapį</button>
            </div>
        </section>
        `;

    const goHomeButton = registrationComplete.querySelector("#linkToHomePage");

    const mountView = () => {
        goHomeButton.addEventListener("click", () =>
            route("/", {}, unmountView)
        );
    };

    const viewDidMount = () => {};

    const unmountView = () => {
        goHomeButton.removeEventListener("click", route);
    };

    // - Events

    mountView();

    return { view: registrationComplete, viewDidMount: viewDidMount };
};

export default registrationComplete;
