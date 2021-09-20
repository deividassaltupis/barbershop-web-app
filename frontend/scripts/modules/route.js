import render from "./render.js";
import session from "../utils/session.js";
import { verifyUser } from "./auth.js";
import { removeUserSession, getUser } from "../utils/session.js";

const defaultPage = "pradzia";

const route = async (req, data = {}, unmountComponent = null) => {
    if (unmountComponent) unmountComponent();
    switch (req) {
        case "/":
            render(defaultPage, data);
            break;
        case "/pradzia":
            render("pradzia", data);
            break;
        case "/paslaugos":
            render("paslaugos", data);
            break;
        case "/registracija":
            render("registracija", data);
            break;
        case "/kontaktai":
            render("kontaktai", data);
            break;
        case "/pranesimas_issiustas":
            render("pranesimas_issiustas", data);
            break;
        case "/registracija_sekminga":
            render("registracija_sekminga", data);
            break;
        case "/prisijungimas":
            render("prisijungimas", data);
            break;
        case "/atsijungti":
            removeUserSession();
            render("prisijungimas", data);
            break;
        case "/darbuotojo_darbalaukis":
        case "/darbuotojo_registracijos":
        case "/darbuotojo_paslaugos":
        case "/darbuotojo_nustatymai":
        case "/darbuotojas_prideti_registracija":
        case "/darbuotojas_prideti_paslauga":
        case "/darbuotojas_atnaujinti_paslauga":
            if ((await verifyUser()) == false) {
                console.log("user not verified");
                render("prisijungimas", data);
                break;
            }
            const user = getUser();
            data.user = user;
            console.log("user verified");
            switch (req) {
                case "/darbuotojo_darbalaukis":
                    render("darbuotojo_darbalaukis", data);
                    break;
                case "/darbuotojo_registracijos":
                    render("darbuotojo_registracijos", data);
                    break;
                case "/darbuotojo_paslaugos":
                    render("darbuotojo_paslaugos", data);
                    break;
                case "/darbuotojo_nustatymai":
                    render("darbuotojo_nustatymai", data);
                    break;
                case "/darbuotojas_prideti_registracija":
                    render("darbuotojas_prideti_registracija", data);
                    break;
                case "/darbuotojas_prideti_paslauga":
                    render("darbuotojas_prideti_paslauga", data);
                    break;
                case "/darbuotojas_atnaujinti_paslauga":
                    render("darbuotojas_atnaujinti_paslauga", data);
                    break;
            }
            break;
        default:
            render("404", data);
            break;
    }
};

export default route;
