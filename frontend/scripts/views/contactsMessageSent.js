import route from "../modules/route.js";
const contactsMessageSent = (data = {}) => {
    let contactsMessageSent = document.createElement("div");
    contactsMessageSent.id = "message-sent-content";
    contactsMessageSent.innerHTML =
        /*html*/
        `
        <section class='message-sent container'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Pranešimas išsiųstas</span></h2>
            </div>
            <div class="message-sent__content">
                <p>Atsakysime į jūsų užklausą kaip galėdami greičiau</p>
                <button class="button-link" id='linkToHomePage'>Grižti į pradinį puslapį</button>
            </div>
        </section>
        `;

    contactsMessageSent
        .querySelector("#linkToHomePage")
        .addEventListener("click", () => route("/"));

    const mountView = () => {};

    const viewDidMount = () => {};

    const unmountView = () => {};

    // - Events

    mountView();

    return { view: contactsMessageSent, viewDidMount: viewDidMount };
};

export default contactsMessageSent;
