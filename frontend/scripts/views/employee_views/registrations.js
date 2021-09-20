import route from "../../modules/route.js";
import employeeNav from "../components/employeeNav.js";
import employeeAddRegistration from "./addRegistration.js";

const employeeRegistrations = (data = {}) => {
    let employeeRegistrations = document.createElement("div");
    employeeRegistrations.id = "employee-registrations";
    employeeRegistrations.innerHTML =
        /*html*/
        `
        <div class='registrations'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Registruoti vizitai</span></h2>
            </div>
            <div class="registrations__content">
                <div class="registrations__add-button-row">
                    <button class="btn btn-spring-green-light" id="add-registration-button">
                        <i class="fas fa-plus"></i>
                        <span>Pridėti registracija</span>
                    </button>
                </div>
                <div class="registrations__filter-row">
                    <div class="filter__show-select-box">
                        <label for="show-select">Rodyti</label>
                        <select id="show-select">
                            <option value="0">Šios dienos</option>
                            <option value="1">Pasirinkti datą</option>
                        </select>
                    </div>
                    <div class="filter__date-box">
                        <div class="filter__date-select-box">

                            <label for="show-select">Nuo</label>
                            <div class="filter__selection-row">
                                <select id="show-select" disabled >
                                    <option value="0">2021</option>
                                </select>
                                <select id="show-select" disabled >
                                    <option value="0">07</option>
                                </select>
                                <select id="show-select" disabled >
                                    <option value="0">24</option>
                                </select>
                            </div>

                            <label for="show-select">Iki</label>
                            <div class="filter__selection-row">
                                <select id="show-select" disabled >
                                    <option value="0">2021</option>
                                </select>
                                <select id="show-select" disabled >
                                    <option value="0">07</option>
                                </select>
                                <select id="show-select" disabled >
                                    <option value="0">24</option>
                                </select>
                            </div>
                        </div>
                        <div class="filter__date-button-row">
                            <button class="btn btn-white">Filtruoti</button>
                        </div>
                    </div>
                </div>
                <div class="registrations__filter-result">
                    <i class="far fa-calendar-alt"></i><p>Rodomos registracijos laikotarpyje nuo 2021-08-01 iki 2021-10-31</p>
                </div>
                <div class="registrations__card-headings">
                    <div class="card__date-heading">
                        <span>Data ir Laikas</span>
                    </div>
                    <div class="card__info-heading">
                        <span>Informacija apie klientą ir užsakytą paslaugą</span>
                    </div>
                    <div class="card__actions-heading">
                        <span>Veiksmai</span>
                    </div>
                </div>
                <div class="registrations__card-rows">
                    <div class="card__row">
                        <div class="card__label">
                            <i class="fas fa-play"></i>
                            <img class="card__label-icon label-icon--future" src="./styles/images/icons/wall-clock.png" alt="" />
                        </div>
                        <div class="card__box card-box--info">
                            <div class="card__notification-row">
                                <img src="./styles/images/icons/information-button.png" alt="" />
                                <p>Iki artimiausio registruoto vizito liko: 2d 13:21:45</p>
                            </div>
                        </div>
                    </div>

                    <div class="card__row">
                        <div class="card__label">
                            <i class="fas fa-play"></i>
                            <img class="card__label-icon label-icon--future" src="./styles/images/icons/wall-clock.png" alt="" />
                        </div>
                        <div class="card__box card-box--info">
                            <div class="card__notification-row">
                                <img src="./styles/images/icons/information-button.png" alt="" />
                                <p>Artimiausiu metu nėra registruotų vizitų</p>
                            </div>
                        </div>
                    </div>

                    <div class="card__row">
                        <div class="card__label">
                            <p>#1</p>
                            <img class="card__label-icon label-icon--past" src="./styles/images/icons/history.png" alt="" />
                        </div>
                        <div class="card__box card-box--past">
                            <div class="card__date-time-row">
                                <span class="card__date">2021-07-20</span>
                                <span class="card__time">15:00 - 16:15</span>
                            </div>
                            <div class="card__info-box">
                                <div class="card__customer-info">
                                    <span>Simonas Simonavičius</span>
                                    <span>vardenispavardenis99@gmail.com</span>
                                    <span>+37064785615</span>
                                </div>
                                <div class="card__service-title">
                                    <span>Vyriškas kirpimas + barzdos modeliavimas</span>
                                </div>
                                <div class="card__service-price">
                                    <span>25.00 &euro;</span>
                                </div>
                            </div>
                            <div class="card__actions-row">
                                <button class='btn btn-sm btn-spring-green'><i class="fas fa-check-circle fa-sm"></i>Atvyko</button>
                                <button class='btn btn-sm btn-light-red'><i class="fas fa-times-circle fa-sm"></i>Neatvyko</button>
                                <button class='btn btn-sm btn-grey'><i class="far fa-trash-alt fa-sm"></i>Ištrinti įrašą</button>
                            </div>
                        </div>
                    </div>

                    <div class="card__row">
                        <div class="card__label">
                            <p>#2</p>
                            <i class="fas fa-play"></i>
                        </div>
                        <div class="card__box card-box--current">
                            <div class="card__date-time-row">
                                <span class="card__date">2021-07-20</span>
                                <span class="card__time">16:15 - 16:45</span>
                            </div>
                            <div class="card__info-box">
                                <div class="card__customer-info">
                                    <span>Algirdas Algirdavičius</span>
                                    <span>vardenispavardenis99@gmail.com</span>
                                    <span>+37064785615</span>
                                </div>
                                <div class="card__service-title">
                                    <span>Vyriškas kirpimas</span>
                                </div>
                                <div class="card__service-price">
                                    <span>15.00 &euro;</span>
                                </div>
                            </div>
                            <div class="card__actions-row">
                                <button class='btn btn-sm btn-spring-green'><i class="fas fa-check-circle fa-sm"></i>Atvyko</button>
                                <button class='btn btn-sm btn-light-red'><i class="fas fa-times-circle fa-sm"></i>Neatvyko</button>
                                <button class='btn btn-sm btn-grey'><i class="far fa-trash-alt fa-sm"></i>Ištrinti įrašą</button>
                            </div>
                        </div>
                    </div>

                    <div class="card__row">
                        <div class="card__label">
                            <p>#3</p>
                            <img class="card__label-icon label-icon--future" src="./styles/images/icons/wall-clock.png" alt="" />
                        </div>
                        <div class="card__box card-box--future">
                            <div class="card__date-time-row">
                                <span class="card__date">2021-07-20</span>
                                <span class="card__time">16:45 - 17:15</span>
                            </div>
                            <div class="card__info-box">
                                <div class="card__customer-info">
                                    <span>Roberta Robertaitė</span>
                                    <span>vardenispavardenis99@gmail.com</span>
                                    <span>+37064785615</span>
                                </div>
                                <div class="card__service-title">
                                    <span>Proginė šukuosena</span>
                                </div>
                                <div class="card__service-price">
                                    <span>40.00 &euro;</span>
                                </div>
                            </div>
                            <div class="card__actions-row">
                                <button class='btn btn-sm btn-light-orange'><i class="fas fa-window-close fa-sm"></i>Atšaukti registraciją</button>
                                <button class='btn btn-sm btn-light-yellow'><i class="fas fa-edit fa-sm"></i>Keisti datą ir laiką</button>
                            </div>
                        </div>
                    </div>

                    <div class="card__edit-row">
                        <form class="card__edit-form">
                            <div class="select-group">
                                <label for="">Metai</label>
                                <select type="text" class="edit__year-select" id="year-select">
                                    <option value=""></option>
                                    <option value="">2021</option>
                                </select>
                            </div>
                            <div class="select-group">
                                <label for="">Mėnuo</label>
                                <select type="text" class="edit__month-select" id="month-select">
                                    <option value=""></option>
                                    <option value="">09</option>
                                </select>
                            </div>
                            <div class="select-group">
                                <label for="">Diena</label>
                                <select type="text" class="edit__day-select" id="day-select">
                                    <option value=""></option>
                                    <option value="">15</option>
                                </select>
                            </div>
                            <div class="select-group">
                                <label for="">Laikas</label>
                                <select type="text" class="edit__time-select" id="time-select">
                                    <option value=""></option>
                                    <option value="">15:00 - 16:30</option>
                                </select>
                            </div>
                            <button class="btn btn-dark-green" id="edit-card-save-button">Išsaugoti</button>
                        </form>
                        <p class="card__edit-info">
                            <i class="fas fa-info-circle"></i>
                            Klientui bus išsiųstas pranešimas el.paštu apie pakeistą vizito laiką
                        </p>
                        <p class="card__edit-info">
                            <i class="fas fa-info-circle"></i>
                            Keičiant vizito laiką rekomanduojama susisiekti su klientu ir sutarti dėl kito laiko.
                        </p>
                    </div>

                </div>
            </div>
        </div>
        `;

    const addRegistrationButton = employeeRegistrations.querySelector(
        "#add-registration-button"
    );

    const editCardSaveButton = employeeRegistrations.querySelector(
        "#edit-card-save-button"
    );

    employeeRegistrations.insertBefore(
        employeeNav(),
        employeeRegistrations.querySelector(".registrations")
    );

    addRegistrationButton.addEventListener("click", () =>
        route("/darbuotojas_prideti_registracija")
    );

    editCardSaveButton.addEventListener("click", (e) => {
        e.preventDefault();
    });

    const mountView = () => {};

    const viewDidMount = () => {};

    const unmountView = () => {};

    // - Events

    mountView();

    return { view: employeeRegistrations, viewDidMount: viewDidMount };
};

export default employeeRegistrations;
