import route from "../../modules/route.js";
import employeeNav from "../components/employeeNav.js";
import { EMPLOYEE_GET_REGISTRATIONS_URI } from "../../utils/endpoints.js";
import { displayWarning, displaySuccess } from "../components/alerts.js";
import pageRequest from "../../modules/pageRequest.js";

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

                            <label for="">Nuo</label>
                            <div class="filter__input-row">
                                <input type="text" id="show-start-year" class="filter-input-2x" placeholder="Metai" />
                                <input type="text" id="show-start-month" class="filter-input-1x" placeholder=".m" />
                                <input type="text" id="show-start-day" class="filter-input-1x" placeholder=".d"/>
                            </div>

                            <label for="">Iki</label>
                            <div class="filter__input-row">
                                <input type="text" id="show-end-year" class="filter-input-2x"  placeholder="Metai"/>
                                <input type="text" id="show-end-month" class="filter-input-1x"  placeholder=".m"/>
                                <input type="text" id="show-end-day" class="filter-input-1x"  placeholder=".d"/>
                            </div>
                        </div>
                        <div class="filter__date-button-row">
                            <button class="btn btn-white" id="filter-button">Filtruoti</button>
                        </div>
                    </div>
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
                </div>
            </div>
        </div>
        `;

    const addRegistrationButton = employeeRegistrations.querySelector(
        "#add-registration-button"
    );

    const registrationListElem = employeeRegistrations.querySelector(
        ".registrations__card-rows"
    );

    const showPeriodSelectElem =
        employeeRegistrations.querySelector("#show-select");

    const filterButtonElem =
        employeeRegistrations.querySelector("#filter-button");

    const showFromYearInput =
        employeeRegistrations.querySelector("#show-start-year");
    const showFromMonthInput =
        employeeRegistrations.querySelector("#show-start-month");
    const showFromDayInput =
        employeeRegistrations.querySelector("#show-start-day");

    const showUntilYearInput =
        employeeRegistrations.querySelector("#show-end-year");
    const showUntilMonthInput =
        employeeRegistrations.querySelector("#show-end-month");
    const showUntilDayInput =
        employeeRegistrations.querySelector("#show-end-day");

    let showPeriodOption = 0;

    let startDate = null;
    let endDate = null;

    let nearestVisitTimestamp = null;
    let countdownIntervalID = null;
    let updateRegistrationsIntervalID = null;

    let editModeSelectedRegID = "";

    const secondsToDhms = (seconds) => {
        seconds = Number(seconds);
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

        var dDisplay = d > 0 ? d + " d., " : "";
        var hDisplay = h > 0 ? h + " h, " : "";
        var mDisplay = m > 0 ? m + " min., " : "";
        var sDisplay = s > 0 ? s + " sek. " : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    };

    const updateNearestVisitCountdown = () => {
        if (pageRequest() != "/darbuotojo_registracijos") {
            if (countdownIntervalID) clearInterval(countdownIntervalID);
            return;
        }
        const now = new Date();
        const secs = (nearestVisitTimestamp - now.getTime()) / 1000;
        const countdownText = registrationListElem.querySelector(
            "#countdown-until-visit"
        );
        if (secs <= 0) {
            if (countdownIntervalID) clearInterval(countdownIntervalID);
            countdownText.innerHTML = `Artimiausias registruotas klientas turėtų pasirodyti dabar.`;
        } else {
            countdownText.innerHTML = `Iki artimiausio registruoto vizito liko: <strong>${secondsToDhms(
                secs
            )}</strong>`;
        }
    };

    const cancelRegistrationEditMode = () => {
        if (
            registrationListElem.querySelector(
                "#edit-card_" + editModeSelectedRegID
            )
        ) {
            registrationListElem
                .querySelector("#edit-card_" + editModeSelectedRegID)
                .remove();
        }
        editModeSelectedRegID = "";
    };

    const handleEditButtonClick = (e) => {
        e.preventDefault();
        if (editModeSelectedRegID) cancelRegistrationEditMode();
        editModeSelectedRegID = e.target.dataset.regId;
        const editRegistrationCardElem = document.createElement("div");
        editRegistrationCardElem.classList.add("card__edit-row");
        editRegistrationCardElem.id = "edit-card_" + editModeSelectedRegID;
        editRegistrationCardElem.innerHTML =
            /*html*/
            `
                <form class="card__edit-form">
                    <div class="select-group">
                        <label for="">Data ir Laikas</label>
                        <select type="text" class="edit__year-select" id="year-select">
                            <option value=""></option>
                            <option value="">2021-09-30 15:00 - 17:00</option>
                        </select>
                    </div>
                    <button class="btn btn-dark-green">Išsaugoti</button>
                    <button class="btn btn-grey">Atšaukti</button>
                </form>
                <p class="card__edit-info">
                    <i class="fas fa-info-circle"></i>
                    Klientui bus išsiųstas pranešimas el.paštu apie pakeistą vizito laiką
                </p>
                <p class="card__edit-info">
                    <i class="fas fa-info-circle"></i>
                    Keičiant vizito laiką rekomanduojama susisiekti su klientu ir sutarti dėl kito laiko.
                </p>
            `;
        registrationListElem.insertBefore(
            editRegistrationCardElem,
            registrationListElem.querySelector(
                "#reg-card_" + editModeSelectedRegID
            ).nextSibling
        );
    };

    const handleFilterButtonClick = async () => {
        showPeriodSelectElem.selectedIndex = 1;
        showPeriodOption = 1;
        if (
            !showFromYearInput.value ||
            !showFromMonthInput.value ||
            !showFromDayInput.value ||
            !showUntilYearInput.value ||
            !showUntilMonthInput.value ||
            !showUntilDayInput.value
        ) {
            displayWarning(
                "Prašome nurodyti laikotarpį, pagal kurį norite filtruoti registracijas nuo - iki (metus, mėnesį, diena)",
                employeeRegistrations.querySelector(".registrations__content"),
                employeeRegistrations.querySelector(
                    ".registrations__filter-row"
                )
            );
            showFromYearInput.focus();
            return;
        }
        startDate = new Date(
            parseInt(showFromYearInput.value),
            parseInt(showFromMonthInput.value) - 1,
            parseInt(showFromDayInput.value),
            0,
            0
        );
        endDate = new Date(
            parseInt(showUntilYearInput.value),
            parseInt(showUntilMonthInput.value) - 1,
            parseInt(showUntilDayInput.value),
            23,
            59
        );

        if (
            employeeRegistrations.querySelector(".registrations__filter-result")
        ) {
            employeeRegistrations
                .querySelector(".registrations__filter-result")
                .remove();
        }
        const filterResultDisplayElem = document.createElement("div");
        filterResultDisplayElem.classList.add("registrations__filter-result");
        filterResultDisplayElem.innerHTML =
            /*html*/
            `
                <i class="far fa-calendar-alt"></i>
                <p>
                    Rodomos registracijos laikotarpyje nuo 
                    ${showFromYearInput.value}-${showFromMonthInput.value}-${showFromDayInput.value} iki 
                    ${showUntilYearInput.value}-${showUntilMonthInput.value}-${showUntilDayInput.value}
                </p>
            `;
        employeeRegistrations
            .querySelector(".registrations__content")
            .insertBefore(
                filterResultDisplayElem,
                employeeRegistrations.querySelector(
                    ".registrations__card-headings"
                )
            );

        displayRegistrations();
    };

    const handlePeriodSelectChange = () => {
        if (!showPeriodSelectElem.selectedIndex) {
            showPeriodOption = 0;
            if (
                employeeRegistrations.querySelector(
                    ".registrations__filter-result"
                )
            ) {
                employeeRegistrations
                    .querySelector(".registrations__filter-result")
                    .remove();
            }
            displayRegistrations();
        }
    };

    const displayRegistrations = async () => {
        if (pageRequest() != "/darbuotojo_registracijos") {
            if (updateRegistrationsIntervalID)
                clearInterval(updateRegistrationsIntervalID);
            return;
        }
        if (editModeSelectedRegID) return;
        let dateFilter = {};
        const nowDate = new Date();
        if (!showPeriodOption) {
            const year = nowDate.getFullYear();
            const month = nowDate.getMonth();
            const day = nowDate.getDate();

            startDate = new Date(year, month, day, 0, 0);
            endDate = new Date(year, month, day, 23, 59);
        }
        dateFilter = {
            startDate,
            endDate,
        };
        console.log("showPeriodOption: " + showPeriodOption);
        console.log("filter date: ");
        console.log(dateFilter);
        const regArr = await fetchRegistrations(dateFilter);

        registrationListElem.innerHTML = "";

        if (!regArr.length) {
            registrationListElem.innerHTML +=
                /*html*/
                `
                <div class="card__row">
                    <div class="card__label">
                        <i class="fas fa-play"></i>
                        <img class="card__label-icon label-icon--future" src="./styles/images/icons/wall-clock.png" alt="" />
                    </div>
                    <div class="card__box card-box--info">
                        <div class="card__notification-row">
                            <img src="./styles/images/icons/information-button.png" alt="" />
                            <p>Pasirinktu laikotarpiu nėra registruotų vizitų</p>
                        </div>
                    </div>
                </div>
                `;
        } else {
            regArr.sort(
                (regA, regB) =>
                    new Date(regA.startDate) - new Date(regB.startDate)
            );

            if (countdownIntervalID) clearInterval(countdownIntervalID);
            if (
                new Date(regArr[0].startDate).getTime() > nowDate.getTime() &&
                !showPeriodOption
            ) {
                registrationListElem.innerHTML +=
                    /*html*/
                    `
            <div class="card__row">
                <div class="card__label">
                    <i class="fas fa-play"></i>
                    <img class="card__label-icon label-icon--future" src="./styles/images/icons/wall-clock.png" alt="" />
                </div>
                <div class="card__box card-box--info">
                    <div class="card__notification-row">
                        <img src="./styles/images/icons/information-button.png" alt="" />
                        <p id='countdown-until-visit'></p>
                    </div>
                </div>
            </div>
            `;
                nearestVisitTimestamp = new Date(regArr[0].startDate).getTime();
                updateNearestVisitCountdown();
                countdownIntervalID = setInterval(
                    updateNearestVisitCountdown,
                    1000
                );
            }

            regArr.forEach((reg, index, array) => {
                const regStart = new Date(reg.startDate);
                const regEnd = new Date(reg.endDate);

                /*
            0 - past
            1 - present
            2 - future
            */
                let timeType;
                let labelIcon = "";
                let actionButtons = "";
                let boxSubClass = "";
                if (nowDate.getTime() > regEnd.getTime()) {
                    timeType = 0;
                    labelIcon = /*html*/ `<img class="card__label-icon label-icon--past" src="./styles/images/icons/history.png" alt="" />`;

                    if (!reg.visitStatus)
                        actionButtons +=
                            /*html*/
                            `
                    <button class='customer-came-btn btn btn-sm btn-spring-green' data-reg-id="${reg._id}"><i class="fas fa-check-circle fa-sm"></i>Atvyko</button>
                    <button class='customer-skipped-btn btn btn-sm btn-light-red' data-reg-id="${reg._id}"><i class="fas fa-times-circle fa-sm"></i>Neatvyko</button>
                    `;
                    actionButtons +=
                        /*html*/
                        `
                    <button class='delete-reg-btn btn btn-sm btn-grey' data-reg-id="${reg._id}"><i class="far fa-trash-alt fa-sm"></i>Ištrinti įrašą</button>
                    `;
                    boxSubClass = "card-box--past";
                } else if (
                    nowDate.getTime() <= regEnd.getTime() &&
                    nowDate.getTime() >= regStart.getTime()
                ) {
                    timeType = 1;
                    labelIcon = /*html*/ `<i class="fas fa-play"></i>`;
                    if (!reg.visitStatus)
                        actionButtons +=
                            /*html*/
                            `
                        <button class='customer-came-btn btn btn-sm btn-spring-green' data-reg-id="${reg._id}"><i class="fas fa-check-circle fa-sm"></i>Atvyko</button>
                        <button class='customer-skipped-btn btn btn-sm btn-light-red' data-reg-id="${reg._id}"><i class="fas fa-times-circle fa-sm"></i>Neatvyko</button>
                        `;
                    actionButtons +=
                        /*html*/
                        `
                        <button class='delete-reg-btn btn btn-sm btn-grey' data-reg-id="${reg._id}"><i class="far fa-trash-alt fa-sm"></i>Ištrinti įrašą</button>
                        `;
                    boxSubClass = "card-box--current";
                } else if (nowDate.getTime() < regStart.getTime()) {
                    timeType = 2;
                    labelIcon = /*html*/ `<img class="card__label-icon label-icon--future" src="./styles/images/icons/wall-clock.png" alt="" />`;
                    actionButtons =
                        /*html*/
                        `
                    <button class='cancel-reg-btn btn btn-sm btn-light-orange' data-reg-id="${reg._id}"><i class="fas fa-window-close fa-sm"></i>Atšaukti registraciją</button>
                    <button class='edit-reg-btn btn btn-sm btn-light-yellow' data-reg-id="${reg._id}"><i class="fas fa-edit fa-sm"></i>Keisti datą ir laiką</button>
                    `;
                    boxSubClass = "card-box--future";
                }

                const regYear = regStart.getFullYear();
                const regMonth = ("0" + (regStart.getMonth() + 1)).slice(-2);
                const regDay = ("0" + regStart.getDate()).slice(-2);

                const regStartHour = ("0" + regStart.getHours()).slice(-2);
                const regStartMin = ("0" + regStart.getMinutes()).slice(-2);
                const regEndHour = ("0" + regEnd.getHours()).slice(-2);
                const regEndMin = ("0" + regEnd.getMinutes()).slice(-2);

                registrationListElem.innerHTML +=
                    /*html*/
                    `
                <div class="card__row" id="reg-card_${reg._id}">
                    <div class="card__label">
                        <p>#${index + 1}</p>
                        ${labelIcon}
                    </div>
                    <div class="card__box ${boxSubClass}">
                        <div class="card__date-time-row">
                            <span class="card__date">${regYear}-${regMonth}-${regDay}</span>
                            <span class="card__time">${regStartHour}:${regStartMin} - ${regEndHour}:${regEndMin}</span>
                        </div>
                        <div class="card__info-box">
                            <div class="card__customer-info">
                                <span>${reg.customer.name} ${
                        reg.customer.surname
                    }</span>
                                <span>${reg.customer.email}</span>
                                <span>${reg.customer.phone}</span>
                            </div>
                            <div class="card__service-title">
                                <span>${reg.serviceTitle}</span>
                            </div>
                            <div class="card__service-price">
                                <span>${reg.servicePrice} &euro;</span>
                            </div>
                        </div>
                        <div class="card__actions-row">
                            ${actionButtons}
                        </div>
                    </div>
                </div>
            `;
            });
            const editRegBtns =
                registrationListElem.querySelectorAll(".edit-reg-btn");
            const cancelRegBtns =
                registrationListElem.querySelectorAll(".cancel-reg-btn");
            const customerCameBtns =
                registrationListElem.querySelectorAll(".customer-came-btn");
            const customerSkippedBtns = registrationListElem.querySelectorAll(
                ".customer-skipped-btn"
            );
            editRegBtns.forEach((btn) => {
                btn.addEventListener("click", handleEditButtonClick);
            });
        }
    };

    const fetchRegistrations = async (dateFilter) => {
        const regArr = await axios
            .post(EMPLOYEE_GET_REGISTRATIONS_URI, dateFilter, data.authHeader)
            .then((res) => res.data.regArr)
            .catch((err) => {
                if (err.response.data.message)
                    displayError(
                        err.response.data.message,
                        employeeRegistrations.querySelector(
                            ".registrations__content"
                        ),
                        employeeRegistrations.querySelector(
                            ".registrations__card-headings"
                        )
                    );
            });
        return regArr;
    };

    const mountView = () => {
        employeeRegistrations.insertBefore(
            employeeNav(),
            employeeRegistrations.querySelector(".registrations")
        );

        addRegistrationButton.addEventListener("click", () =>
            route("/darbuotojas_prideti_registracija", {}, unmountView)
        );

        // editCardSaveButton.addEventListener("click", (e) => {
        //     e.preventDefault();
        // });

        filterButtonElem.addEventListener("click", handleFilterButtonClick);

        showPeriodSelectElem.addEventListener(
            "change",
            handlePeriodSelectChange
        );
    };

    const viewDidMount = () => {
        displayRegistrations();
        updateRegistrationsIntervalID = setInterval(
            displayRegistrations,
            10000
        );
    };

    const unmountView = () => {
        if (countdownIntervalID) clearInterval(countdownIntervalID);
        if (updateRegistrationsIntervalID)
            clearInterval(updateRegistrationsIntervalID);
        filterButtonElem.removeEventListener("click", handleFilterButtonClick);
        addRegistrationButton.removeEventListener("click", route);
    };

    // - Events

    mountView();

    return { view: employeeRegistrations, viewDidMount: viewDidMount };
};

export default employeeRegistrations;
