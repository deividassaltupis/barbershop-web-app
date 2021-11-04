import {
    displayError,
    displayWarning,
    displaySuccess,
} from "./components/alerts.js";
import route from "../modules/route.js";
import { setUserSession } from "../utils/session.js";
import { USER_LOGIN_URI } from "../utils/endpoints.js";

const login = (data = {}) => {
    let login = document.createElement("div");
    login.id = "login-content";
    login.innerHTML =
        /*html*/
        `
        <section class='login-section container'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Prisijungimas</span></h2>
            </div>
            <div class='login__form-box'>
                <form id='login__form'>
                    <div class='label-input-group'>
                        <label for='username-input'>Vartotojo vardas</label>
                        <input type="text" id='username-input' readonly/>
                    </div>
                    <div class='label-input-group'>
                        <label for='password-input'>Slaptažodis</label>
                        <input type="password" id='password-input' readonly/>
                    </div>
                    <button class="button-link" id='forget-password'>Pamiršau slaptažodį</button>
                    <div class="login__button-row">
                        <button id='login-button' class='btn btn-yellow-green'>Prisijungti</button>
                    </div>
                </form>
            </div>
        </section>
        `;

    // Variables and constants
    const forgetPasswordButton = login.querySelector("#forget-password");
    const loginButton = login.querySelector("#login-button");
    const usernameInput = login.querySelector("#username-input");
    const passwordInput = login.querySelector("#password-input");

    const handleLogin = (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        usernameInput.value = passwordInput.value = "";

        if (!username || !password) {
            displayWarning(
                "Prašome užpildyti visus formos laukelius",
                login.querySelector(".login__form-box"),
                login.querySelector("#login__form")
            );
            return;
        }
        axios
            .post(USER_LOGIN_URI, {
                username: username,
                password: password,
            })
            .then((res) => {
                setUserSession(res.data.token, res.data.user);
                if (res.data.user.role == "Employee")
                    route("/darbuotojo_darbalaukis", {}, unmountView);
                else if (res.data.user.role == "Admin")
                    route("/admin_darbalaukis", {}, unmountView);
            })
            .catch((err) => {
                if (typeof err.response != "undefined") {
                    if (err.response.status == 401)
                        displayError(
                            err.response.data.message,
                            login.querySelector(".login__form-box"),
                            login.querySelector("#login__form")
                        );
                    else if (err.response.data.message)
                        displayError(
                            `Įvyko sistemos nesklandumų bandant prisijungti, pabandykite vėliau. ${
                                err.response.data.message
                                    ? "<br>Serverio atsakymas: (" +
                                      err.response.status +
                                      ") " +
                                      err.response.data.message
                                    : ""
                            }`,
                            login.querySelector(".login__form-box"),
                            login.querySelector("#login__form")
                        );
                } else
                    displayError(
                        "Atsiprašome, tačiau nepavyko prisijungti prie serverio. Pabandykite vėliau.",
                        login.querySelector(".login__form-box"),
                        login.querySelector("#login__form")
                    );
            });
    };

    // This function is called on view mounting stage (Before view is rendered to UI). In this function essential to view elements can be appended, or actions take place.
    const mountView = () => {
        loginButton.addEventListener("click", (e) => handleLogin(e));

        forgetPasswordButton.addEventListener("click", () => {
            route("/pamirsau_slaptazodi", {}, unmountView);
        });

        passwordInput.addEventListener("mouseover", () => {
            passwordInput.removeAttribute("readonly");
        });
        usernameInput.addEventListener("mouseover", () => {
            usernameInput.removeAttribute("readonly");
        });
    };

    // Callback function viewDidMount is called when view is alraedy mounted and rendered (appended to <main></main> HTML element. and visible in UI).
    const viewDidMount = () => {};

    // Callback function unmountView is called while leaving current view. (e.g: when on routing to another view, event listeners, or intervals can be stopped here).
    const unmountView = () => {
        forgetPasswordButton.removeEventListener("click", route);
        loginButton.removeEventListener("click", handleLogin);
    };

    mountView();

    return { view: login, viewDidMount: viewDidMount };
};

export default login;
