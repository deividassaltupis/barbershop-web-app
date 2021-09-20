import { displayError } from "./components/alerts.js";
import route from "../modules/route.js";

const errorView = (data = {}) => {
    let errorContent = document.createElement("div");
    errorContent.id = "error-content";
    errorContent.innerHTML =
        /*html*/
        `
        <section class='error-section container'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Klaida</span></h2>
            </div>
            <i class="fas fa-bug fa-4x"></i>

            <div class="goback__button-row">
                <button id='goback-btn' class='btn btn-grey btn-sm'>Grižti į pradinį puslapį</button>
            </div>
        </section>
        `;

    // Variables and constants
    const goBackButton = errorContent.querySelector("#goback-btn");

    // This function is called on view mounting stage (Before view is rendered to UI). In this function essential to view elements can be appended, or actions take place.
    const mountView = () => {
        if (!data.errorMessage)
            data.errorMessage =
                "Atsiprašome, tačiau interneto aplikacijoje įvyko nenustatyta klaida";
        displayError(
            data.errorMessage,
            errorContent.querySelector(".error-section"),
            errorContent.querySelector(".goback__button-row")
        );
        goBackButton.addEventListener("click", () =>
            route("/pradzia", {}, unmountView)
        );
    };

    // Callback function viewDidMount is called when view is alraedy mounted and rendered (appended to <main></main> HTML element. and visible in UI).
    const viewDidMount = () => {};

    // Callback function unmountView is called while leaving current view. (e.g: when on routing to another view, event listeners, or intervals can be stopped here).
    const unmountView = () => {
        goBackButton.removeEventListener("click", route);
    };

    mountView();

    return { view: errorContent, viewDidMount: viewDidMount };
};

export default errorView;
