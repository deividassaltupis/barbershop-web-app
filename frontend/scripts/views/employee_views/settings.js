import route from "../../modules/route.js";
import employeeNav from "../components/employeeNav.js";
import {
    EMPLOYEE_GET_SCHEDULES_URI,
    EMPLOYEE_ADD_SCHEDULE_URI,
    EMPLOYEE_DELETE_SCHEDULE_URI,
    CHANGE_USER_PASSWORD_URI,
    UPDATE_USER_URI,
} from "../../utils/endpoints.js";
import {
    displaySuccess,
    displayError,
    displayWarning,
} from "../components/alerts.js";

const employeeSettings = (data = {}) => {
    let employeeSettings = document.createElement("div");
    employeeSettings.id = "employee-settings";
    employeeSettings.innerHTML =
        /*html*/
        `
        <div class='settings'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Nustatymai</span></h2>
            </div>
            <div class="settings__content">
                <div class="settings__user-info-box">
                    <p><span class="bold-text">Vartotojo vardas:</span> ${
                        data.user.username
                    }</p>
                    <p><span class="bold-text">El. pašto adresas:</span> ${
                        data.user.email
                    }</p>
                </div>

                <!-- Main user info form -->
                <div class="settings__section-heading-row">
                    <h2 class="settings__section-heading">Pagrindinė informacija</h2>
                    <button class="settings__section-toggler" type="button" data-box-id="user-info-form" style="display: flex;">
                        <img src="styles/images/icons/arrow-down-sign-to-navigate.png" alt="" />
                    </button>
                </div>
                <form class="settings__form" id="user-info-form" style="display: none;">
                    <div class="input-group">
                        <label for="name-input">Vardas:</label>
                        <input class="input-skyblue" type="text" id="name-input" value="${
                            data.user.name
                        }" />
                    </div>
                    <div class="input-group">
                        <label for="surname-input">Pavardė</label>
                        <input class="input-skyblue" type="text" id="surname-input" value="${
                            data.user.surname ? data.user.surname : ""
                        }" />
                    </div>
                    <div class="checkbox-group">
                        <input type="checkbox" id="show-surname-public" ${
                            data.user.surnamePublic ? "checked" : ""
                        }/>
                        <label for="show-surname-public">Rodyti pavardę viešai</label>
                    </div>
                    <div class="input-group">
                        <label for="phone-input">Telefono numeris</label>
                        <input class="input-skyblue" type="text" id="phone-input" value="${
                            data.user.phone
                        }"/>
                        <p class="input-group__sublabel">(Vieštai rodoma, skirta klientams susisiekti)</p>
                    </div>
                    <button class="settings__button btn-skyblue" type='button' id="update-user-data-btn">Išsaugoti</button>
                </form>

                <!-- User password change form -->
                <div class="settings__section-heading-row">
                    <h2 class="settings__section-heading">Keisti slaptažodį</h2>
                    <button class="settings__section-toggler" type="button" data-box-id="password-change-form" style="display: flex;">
                        <img src="styles/images/icons/arrow-down-sign-to-navigate.png" alt="" />
                    </button>
                </div>
                <form class="settings__form" id="password-change-form" style="display: none;">
                    <div class="input-group">
                        <label for="name-input">Dabartinis slaptažodis:</label>
                        <input class="input-purple" type="password" id="password-input" />
                    </div>
                    <div class="input-group">
                        <label for="surname-input">Naujas slaptažodis</label>
                        <input class="input-purple" type="password" id="new-password-input" />
                    </div>
                    <div class="input-group">
                        <label for="surname-input">Pakartoti naują slaptažodį</label>
                        <input class="input-purple" type="password" id="repeat-password-input" />
                    </div>
                    <button class="settings__button btn-purple" type='button' id="update-password-btn">Atnaujinti slaptažodį</button>
                </form>

                <!-- Employee add work schedule form -->
                <div class="settings__section-heading-row">
                    <h2 class="settings__section-heading">Nustatyti naują darbo grafiką</h2>
                    <button class="settings__section-toggler" type="button" data-box-id="work-schedule-form" style="display: flex;">
                        <img src="styles/images/icons/arrow-down-sign-to-navigate.png" alt="" />
                    </button>
                </div>
                <form class="settings__form" id="work-schedule-form" style="display: none;">
                    <div class="radio-group">
                        <input type="radio" name="schedule-type" id="radio-weekdays"/>
                        <label for="radio-weekdays">Pasirinkti konkrečias savaitės dienas</label>
                    </div>
                    <div class="weekdays-checkbox-row">
                        <div class="weekday-checkbox-group">
                            <input type="checkbox" class="weekday-checkbox" id="checkbox-monday" data-weekday="1" disabled/>
                            <label for="checkbox-monday">Pirmadienis</label>
                        </div>
                        <div class="weekday-checkbox-group">
                            <input type="checkbox" class="weekday-checkbox" id="checkbox-tuesday" data-weekday="2" disabled/>
                            <label for="checkbox-tuesday">Antradienis</label>
                        </div>
                        <div class="weekday-checkbox-group">
                            <input type="checkbox" class="weekday-checkbox" id="checkbox-wednesday" data-weekday="3" disabled/>
                            <label for="checkbox-wednesday">Trečiadienis</label>
                        </div>
                        <div class="weekday-checkbox-group">
                            <input type="checkbox" class="weekday-checkbox" id="checkbox-thursday" data-weekday="4" disabled/>
                            <label for="checkbox-thursday">Ketvirtadienis</label>
                        </div>
                        <div class="weekday-checkbox-group">
                            <input type="checkbox" class="weekday-checkbox" id="checkbox-friday" data-weekday="5" disabled/>
                            <label for="checkbox-friday">Penktadienis</label>
                        </div>
                        <div class="weekday-checkbox-group">
                            <input type="checkbox" class="weekday-checkbox" id="checkbox-saturday" data-weekday="6" disabled/>
                            <label for="checkbox-saturday">Šeštadienis</label>
                        </div>
                        <div class="weekday-checkbox-group">
                            <input type="checkbox" class="weekday-checkbox" id="checkbox-sunday" data-weekday="0" disabled/>
                            <label for="checkbox-sunday">Sekmadienis</label>
                        </div>
                    </div>
                    <div class="workhours-input-groups-row" id="workhours-weekdays">
                        <div class="workhours__input-group">
                            <input type="text" value="" class="work-start-hour" disabled/>
                            <span class="workhours__mark">:</span>
                            <input type="text" value="" class="work-start-min" disabled/>
                        </div>
                        <span class="workhours__dash">-</span>
                        <div class="workhours__input-group">
                            <input type="text" value="" class="work-end-hour"  disabled/>
                            <span class="workhours__mark">:</span>
                            <input type="text" value="" class="work-end-min"  disabled/>
                        </div>
                    </div>

                    <div class="radio-group">
                        <input type="radio" name="schedule-type" id="radio-even-days"/>
                        <label for="radio-even-days">Dirbti lyginėmis mėnesio dienomis (2, 4, 6, ...)</label>
                    </div>
                    <div class="workhours-input-groups-row" id="workhours-even-days">
                        <div class="workhours__input-group">
                            <input type="text" value="" class="work-start-hour"  disabled/>
                            <span class="workhours__mark">:</span>
                            <input type="text" value="" class="work-start-min"  disabled/>
                        </div>
                        <span class="workhours__dash">-</span>
                        <div class="workhours__input-group">
                            <input type="text" value="" class="work-end-hour" disabled />
                            <span class="workhours__mark">:</span>
                            <input type="text" value="" class="work-end-min"  disabled/>
                        </div>
                    </div>

                    <div class="radio-group">
                        <input type="radio" name="schedule-type" id="radio-odd-days"/>
                        <label for="radio-odd-days">Dirbti nelyginėmis mėnesio dienomis (1, 3, 5, ...)</label>
                    </div>
                    <div class="workhours-input-groups-row" id="workhours-odd-days">
                        <div class="workhours__input-group">
                            <input type="text" value="" class="work-start-hour"  disabled/>
                            <span class="workhours__mark">:</span>
                            <input type="text" value="" class="work-start-min"  disabled/>
                        </div>
                        <span class="workhours__dash">-</span>
                        <div class="workhours__input-group">
                            <input type="text" value="" class="work-end-hour"  disabled/>
                            <span class="workhours__mark">:</span>
                            <input type="text" value="" class="work-end-min"  disabled/>
                        </div>
                    </div>

                    <div class="date-input-row">
                        <p class="date-input-group-label">Nustatyti šį darbo grafiką veikti nuo:</p>
                        <div class="date-input-group">
                            <input type="text" value="" class="schedule-start-year" />
                            <span>-</span>
                            <input type="text" value="" class="schedule-start-month" />
                            <span>-</span>
                            <input type="text" value="" class="schedule-start-day" />
                        </div>
                        <p class="text-c-blue" style='display: none;' id="reco-new-schedule-date-label">(Rekomenduojama data)</p>
                    </div>

                    <div class="date-input-row">
                        <p class="date-input-group-label">Iki:</p>
                        <div class="date-input-group">
                            <input type="text" value="" class="schedule-end-year" />
                            <span>-</span>
                            <input type="text" value="" class="schedule-end-month" />
                            <span>-</span>
                            <input type="text" value="" class="schedule-end-day" />
                        </div>
                    </div>

                    <!-- <p class="py-20">Vėliausias registruotas kliento vizitas numatytas<br>
                    // <span id="latest-visit-date-time" class="text-nowrap">2021-09-29 20:30 - 21:35</span></p>
                    -->

                    <p class="py-20" style="display: none;" id="registrations-cancel-note"></p>

                    <button class="settings__button btn-cherry" type='button' id="add-schedule-btn">Išsaugoti darbo grafiką</button>
                </form>

                <!-- Employee schedule list -->
                <div class="settings__section-heading-row">
                    <h2 class="settings__section-heading">Mano darbo grafikai</h2>
                    <button class="settings__section-toggler" type="button" data-box-id="work-schedule-list" style="display: flex;">
                        <img src="styles/images/icons/arrow-down-sign-to-navigate.png" alt="" />
                    </button>
                </div>
                <div class="settings__schedule-list" id="work-schedule-list" style="display: none;">
                </div>

                <!-- Employee vacation list -->
                <!--
                <div class="settings__section-heading-row">
                    <h2 class="settings__section-heading">Mano atostogos</h2>
                    <button class="settings__section-toggler" type="button" data-box-id="vacation-section" style="display: flex;">
                        <img src="styles/images/icons/arrow-down-sign-to-navigate.png" alt="" />
                    </button>
                </div>
                <div class="settings__vacation" id="vacation-section" style="display: none;">
                    <div class="vacation__list">
                        <div class="vacation__item">
                            <div class="vacation__info text-c-purple">
                                <p>Atostogos</p>
                                <p>Nuo: <span class="bold-text">2021-07-31</span></p>
                                <p>Iki: <span class="bold-text">2021-08-05</span></p>
                            </div>
                            <button class="button-link text-c-red">Panaikinti atostogas</button>
                        </div>
                    </div>
                    <h3 class="py-20">Pridėti atostogų laikotarpį</h3>
                    <div class="date-input-row">
                        <p class="date-input-group-label">Nuo:</p>
                        <div class="date-input-group">
                            <input type="text" class="vacation-start-year" />
                            <span>-</span>
                            <input type="text" class="vacation-start-month" />
                            <span>-</span>
                            <input type="text" class="vacation-start-day" />
                        </div>
                    </div>
                    <div class="date-input-row">
                        <p class="date-input-group-label">Iki:</p>
                        <div class="date-input-group">
                            <input type="text" class="vacation-end-year" />
                            <span>-</span>
                            <input type="text" class="vacation-end-month" />
                            <span>-</span>
                            <input type="text" class="vacation-end-day" />
                        </div>
                    </div>
                    <button class="settings__button btn-pink" type='button'>Pridėti atostogas</button>
                    <p>Atostogų laikotarpiu klientai negali registruotis vizitui nuo iki nurodytos atostogų datos, tačiau gali registruotis iki, arba po atostogų</p>
                </div>
                -->
            </div>
        </div>
        `;

    // - Variables

    // section togglers
    const toggleArray = employeeSettings.querySelectorAll(
        ".settings__section-toggler"
    );

    // ADD SCHEDULE SECTION vars
    const addScheduleFormElem = employeeSettings.querySelector(
        "#work-schedule-form"
    );
    const radioInputWeekdays =
        employeeSettings.querySelector("#radio-weekdays");
    const radioEvenDays = employeeSettings.querySelector("#radio-even-days");
    const radioOddDays = employeeSettings.querySelector("#radio-odd-days");
    const addScheduleButton =
        employeeSettings.querySelector("#add-schedule-btn");

    // SCHEDULE LIST SECTION vars
    const scheduleListElem = employeeSettings.querySelector(
        "#work-schedule-list"
    );

    // CHANGE PASSWORD SECTION vars

    const updatePasswordBtn = employeeSettings.querySelector(
        "#update-password-btn"
    );

    // UPDATE USER DATA SECTION vars
    const updateUserDataBtn = employeeSettings.querySelector(
        "#update-user-data-btn"
    );

    // BASIC settings view functions

    const sectionToggleHandler = (toggleBtn) => {
        const boxElem = employeeSettings.querySelector(
            "#" + toggleBtn.dataset.boxId
        );
        const toggleImg = toggleBtn.querySelector("img");
        if (boxElem.style.display == "flex") {
            boxElem.style.display = "none";
            toggleImg.src =
                "styles/images/icons/arrow-down-sign-to-navigate.png";
        } else {
            boxElem.style.display = "flex";
            toggleImg.src = "styles/images/icons/navigate-up-arrow.png";
        }
    };

    // SET NEW SCHEDULE SECTION functions

    const changeWeekdayScheduleInputStates = (status) => {
        const weekdayScheduleRowElem = employeeSettings.querySelector(
            ".weekdays-checkbox-row"
        );
        const weekdayCheckboxArray =
            weekdayScheduleRowElem.querySelectorAll(".weekday-checkbox");
        weekdayCheckboxArray.forEach((checkbox) => {
            checkbox.disabled = status ? false : true;
        });
        const workhoursWeekdaysRowElem = employeeSettings.querySelector(
            "#workhours-weekdays"
        );
        const workTimeInputs =
            workhoursWeekdaysRowElem.querySelectorAll("input");
        workTimeInputs.forEach((inputElem) => {
            inputElem.disabled = status ? false : true;
        });
    };

    const changeEvenDaysScheduleInputStates = (status) => {
        const workhoursEvenDaysElem = employeeSettings.querySelector(
            "#workhours-even-days"
        );
        const workTimeInputs = workhoursEvenDaysElem.querySelectorAll("input");
        workTimeInputs.forEach((inputElem) => {
            inputElem.disabled = status ? false : true;
        });
    };

    const changeOddDaysScheduleInputStates = (status) => {
        const workhoursOddDaysElem = employeeSettings.querySelector(
            "#workhours-odd-days"
        );
        const workTimeInputs = workhoursOddDaysElem.querySelectorAll("input");
        workTimeInputs.forEach((inputElem) => {
            inputElem.disabled = status ? false : true;
        });
    };

    const activeScheduleWeekdayInputs = () => {
        if (radioInputWeekdays.checked) {
            changeWeekdayScheduleInputStates(true);
            changeEvenDaysScheduleInputStates(false);
            changeOddDaysScheduleInputStates(false);
        }
    };
    const activateScheduleEvenDayInputs = () => {
        if (radioEvenDays.checked) {
            changeWeekdayScheduleInputStates(false);
            changeEvenDaysScheduleInputStates(true);
            changeOddDaysScheduleInputStates(false);
        }
    };
    const activateScheduleOddDayInputs = () => {
        if (radioOddDays.checked) {
            changeWeekdayScheduleInputStates(false);
            changeEvenDaysScheduleInputStates(false);
            changeOddDaysScheduleInputStates(true);
        }
    };

    const clearAddScheduleFormInputs = () => {
        const weekdayCheckboxes =
            addScheduleFormElem.querySelectorAll(".weekday-checkbox");
        weekdayCheckboxes.forEach((checkbox) => (checkbox.checked = false));
        radioInputWeekdays.checked = false;
        radioEvenDays.checked = false;
        radioOddDays.checked = false;

        addScheduleFormElem
            .querySelectorAll(".work-start-hour")
            .forEach((input) => (input.value = ""));

        addScheduleFormElem
            .querySelectorAll(".work-start-min")
            .forEach((input) => (input.value = ""));

        addScheduleFormElem
            .querySelectorAll(".work-end-hour")
            .forEach((input) => (input.value = ""));

        addScheduleFormElem
            .querySelectorAll(".work-end-min")
            .forEach((input) => (input.value = ""));

        addScheduleFormElem.querySelector(".schedule-end-year").value = "";
        addScheduleFormElem.querySelector(".schedule-end-month").value = "";
        addScheduleFormElem.querySelector(".schedule-end-day").value = "";
    };

    const addScheduleButtonHandler = async (e) => {
        e.preventDefault();

        const schedule = {};
        schedule.selectedWeekdays = [];
        let workTimeInputBox = null;

        if (radioInputWeekdays.checked) {
            const weekdayCheckboxes =
                addScheduleFormElem.querySelectorAll(".weekday-checkbox");
            weekdayCheckboxes.forEach((checkbox) => {
                if (checkbox.checked)
                    schedule.selectedWeekdays.push(
                        parseInt(checkbox.dataset.weekday)
                    );
            });
            if (!schedule.selectedWeekdays.length) {
                displayWarning(
                    "Prašome nurodyti savaitės dienas kuriomis norite dirbti.",
                    employeeSettings.querySelector(".settings__content"),
                    employeeSettings.querySelector("#work-schedule-form")
                );
                return;
            }

            schedule.scheduleType = 1;
            workTimeInputBox = addScheduleFormElem.querySelector(
                "#workhours-weekdays"
            );
        } else if (radioEvenDays.checked) {
            schedule.scheduleType = 2;
            workTimeInputBox = addScheduleFormElem.querySelector(
                "#workhours-even-days"
            );
        } else if (radioOddDays.checked) {
            schedule.scheduleType = 3;
            workTimeInputBox = addScheduleFormElem.querySelector(
                "#workhours-odd-days"
            );
        } else {
            displayWarning(
                "Prašome užpildyti formą apie naują darbo grafiką.",
                employeeSettings.querySelector(".settings__content"),
                employeeSettings.querySelector("#work-schedule-form")
            );
            employeeSettings
                .querySelector("#work-schedule-form")
                .scrollIntoView({ behavior: "smooth" });
            return;
        }

        const workTimeStart = {};
        const workTimeEnd = {};

        workTimeStart.startHour = parseInt(
            workTimeInputBox.querySelector(".work-start-hour").value
        );
        workTimeStart.startMin = parseInt(
            workTimeInputBox.querySelector(".work-start-min").value
        );
        workTimeEnd.endHour = parseInt(
            workTimeInputBox.querySelector(".work-end-hour").value
        );
        workTimeEnd.endMin = parseInt(
            workTimeInputBox.querySelector(".work-end-min").value
        );
        if (
            !workTimeInputBox.querySelector(".work-start-hour").value ||
            !workTimeInputBox.querySelector(".work-start-min").value ||
            !workTimeInputBox.querySelector(".work-end-hour").value ||
            !workTimeInputBox.querySelector(".work-end-min").value
        ) {
            displayWarning(
                "Prašome nurodyti darbo valandas.",
                employeeSettings.querySelector(".settings__content"),
                employeeSettings.querySelector("#work-schedule-form")
            );
            return;
        }
        if (
            workTimeStart.startHour >= 24 ||
            workTimeStart.startMin >= 60 ||
            workTimeEnd.endHour >= 24 ||
            workTimeEnd.endMin >= 60
        ) {
            displayWarning(
                "Prašome nurodyti darbo valandas (00:00 - 23:55) laikotarpyje.",
                employeeSettings.querySelector(".settings__content"),
                employeeSettings.querySelector("#work-schedule-form")
            );
            return;
        }
        if (workTimeStart.startHour >= workTimeEnd.endHour) {
            displayWarning(
                "Darbo trukmė negali būti trumpesnė negu 1 valanda.",
                employeeSettings.querySelector(".settings__content"),
                employeeSettings.querySelector("#work-schedule-form")
            );
            return;
        }

        schedule.workTimeStart = workTimeStart;
        schedule.workTimeEnd = workTimeEnd;

        const scheduleStartDate = {};
        const scheduleEndDate = {};

        scheduleStartDate.year = parseInt(
            addScheduleFormElem.querySelector(".schedule-start-year").value
        );
        scheduleStartDate.month = parseInt(
            addScheduleFormElem.querySelector(".schedule-start-month").value
        );
        scheduleStartDate.day = parseInt(
            addScheduleFormElem.querySelector(".schedule-start-day").value
        );

        scheduleEndDate.year = parseInt(
            addScheduleFormElem.querySelector(".schedule-end-year").value
        );
        scheduleEndDate.month = parseInt(
            addScheduleFormElem.querySelector(".schedule-end-month").value
        );
        scheduleEndDate.day = parseInt(
            addScheduleFormElem.querySelector(".schedule-end-day").value
        );

        schedule.scheduleStartDate = scheduleStartDate;
        schedule.scheduleEndDate = scheduleEndDate;

        await axios
            .post(EMPLOYEE_ADD_SCHEDULE_URI, { schedule }, data.authHeader)
            .then((res) => {
                displaySuccess(
                    "Grafikas sėkmingai pridėtas.",
                    employeeSettings.querySelector(".settings__content"),
                    employeeSettings.querySelector("#work-schedule-form")
                );
            })
            .catch((err) => {
                displayError(
                    err.response.data.message,
                    employeeSettings.querySelector(".settings__content"),
                    employeeSettings.querySelector("#work-schedule-form")
                );
            });
        clearAddScheduleFormInputs();
        displaySchedules();
    };

    const displayLatestScheduleNotification = (scheduleArr) => {
        const latestScheduleDate = new Date(
            Math.max(
                ...scheduleArr.map((schedule) => new Date(schedule.endDate))
            )
        );
        const recommendedNewScheduleDate = new Date(
            latestScheduleDate.getTime()
        );
        recommendedNewScheduleDate.setDate(
            recommendedNewScheduleDate.getDate() + 1
        );

        // vu - Valid Until
        const vuYear = latestScheduleDate.getUTCFullYear();
        const vuMonth = ("0" + (latestScheduleDate.getUTCMonth() + 1)).slice(
            -2
        );
        const vuDay = ("0" + latestScheduleDate.getUTCDate()).slice(-2);

        // reco - Recommended new schedule date
        const recoYear = recommendedNewScheduleDate.getUTCFullYear();
        const recoMonth = (
            "0" +
            (recommendedNewScheduleDate.getUTCMonth() + 1)
        ).slice(-2);
        const recoDay = ("0" + recommendedNewScheduleDate.getUTCDate()).slice(
            -2
        );

        const latestScheduleNoteElement = employeeSettings.querySelector(
            "#registrations-cancel-note"
        );
        latestScheduleNoteElement.style.display = "block";
        latestScheduleNoteElement.innerHTML =
            /*html*/
            `
            Paskutinis jūsų darbo grafikas galioja iki: <span class="bold-text text-nowrap ">${vuYear}-${vuMonth}-${vuDay}</span>.
            <br>
            Nustačiaus naują grafiką ankščiau seno grafiko pabaigos, dalis registruotų vizitų gali būti atšaukti.
            `;

        addScheduleFormElem.querySelector(".schedule-start-year").value =
            recoYear;

        addScheduleFormElem.querySelector(".schedule-start-month").value =
            recoMonth;

        addScheduleFormElem.querySelector(".schedule-start-day").value =
            recoDay;

        addScheduleFormElem.querySelector(
            "#reco-new-schedule-date-label"
        ).style.display = "block";
    };

    // SCHEDULE LIST

    const fetchSchedules = async () => {
        const schedules = await axios
            .get(EMPLOYEE_GET_SCHEDULES_URI, data.authHeader)
            .then((res) => res.data.schedules)
            .catch((err) => {
                displayError(
                    err.response.data.message,
                    employeeSettings.querySelector(".settings__content"),
                    employeeSettings.querySelector("#work-schedule-list")
                );
            });
        return schedules;
    };

    const displaySchedules = async () => {
        const schedules = await fetchSchedules();

        scheduleListElem.innerHTML = "";
        if (schedules.length) {
            // - In ADD SCHEDULE section displays notification about latest schedule.
            displayLatestScheduleNotification(schedules);

            schedules.forEach((schedule) => {
                console.log(schedule);
                const validFrom = new Date(schedule.startDate);
                const vfYear = validFrom.getFullYear();
                const vfMonth = ("0" + (validFrom.getMonth() + 1)).slice(-2);
                const vfDay = ("0" + validFrom.getDate()).slice(-2);

                const validUntil = new Date(schedule.endDate);
                const vuYear = validUntil.getFullYear();
                const vuMonth = ("0" + (validUntil.getMonth() + 1)).slice(-2);
                const vuDay = ("0" + validUntil.getDate()).slice(-2);

                const currentDate = new Date();

                const currentlyValid =
                    validUntil.getTime() < currentDate.getTime() ? false : true;

                scheduleListElem.innerHTML +=
                    /*html*/
                    `
                <div class="schedule__item">
                    <div class="schedule__info">
                        <p><span class="bold-text ${
                            !currentlyValid && "text-c-red"
                        }">${
                        currentlyValid ? "Galioja" : "Nebegalioja"
                    }</span><br>nuo ${vfYear}-${vfMonth}-${vfDay} iki ${vuYear}-${vuMonth}-${vuDay}</p>
                        <p><span class="bold-text">Darbo dienos:</span> ${
                            schedule.workingDays
                        }</p>
                        <p><span class="bold-text">Darbo valandos:</span>
                        ${("0" + schedule.workStartTime.startHour).slice(
                            -2
                        )}:${("0" + schedule.workStartTime.startMinute).slice(
                        -2
                    )} - 
                        ${("0" + schedule.workEndTime.endHour).slice(-2)}:${(
                        "0" + schedule.workEndTime.endMinute
                    ).slice(-2)}</p>
                    </div>
                    <button class="button-link text-c-red remove-schedule-btn" data-schedule-id="${
                        schedule._id
                    }">Panaikinti grafiką</button>
                </div>
            `;
            });
            const removeScheduleBtns = scheduleListElem.querySelectorAll(
                ".remove-schedule-btn"
            );
            removeScheduleBtns.forEach((btn) => {
                btn.addEventListener("click", () =>
                    removeScheduleButtonHandler(btn.dataset.scheduleId)
                );
            });
        } else {
            scheduleListElem.innerHTML +=
                /*html*/
                `
                <div class="schedule__item">
                    <div class="schedule__info">
                        <p>
                            <span class="text-c-red">Grafikų nerasta. Pridėti naują grafiką galite skyriuje 'Nustatyti naują darbo grafiką'</span>
                        </p>
                    </div>
                </div>
                `;
        }
    };

    const removeScheduleButtonHandler = async (scheduleID) => {
        await axios
            .delete(EMPLOYEE_DELETE_SCHEDULE_URI + scheduleID, data.authHeader)
            .then((res) => {
                displaySuccess(
                    res.data.message,
                    employeeSettings.querySelector(".settings__content"),
                    employeeSettings.querySelector("#work-schedule-list")
                );
            })
            .catch((err) => {
                displayError(
                    err.response.data.message,
                    employeeSettings.querySelector(".settings__content"),
                    employeeSettings.querySelector("#work-schedule-list")
                );
            });
        displaySchedules();
    };

    const updatePasswordHandler = async (e) => {
        e.preventDefault();
        const currentPassword =
            employeeSettings.querySelector("#password-input").value;
        const newPassword = employeeSettings.querySelector(
            "#new-password-input"
        ).value;
        const repeatPassword = employeeSettings.querySelector(
            "#repeat-password-input"
        ).value;

        if (!currentPassword || !newPassword || !repeatPassword) {
            displayWarning(
                "Prašome užpildyti visus formos laukelius !",
                employeeSettings.querySelector(".settings__content"),
                employeeSettings.querySelector("#password-change-form")
            );
            return;
        }
        if (newPassword !== repeatPassword) {
            displayWarning(
                "Slaptažodžiai nesutampa. Pabandykite iš naujo.",
                employeeSettings.querySelector(".settings__content"),
                employeeSettings.querySelector("#password-change-form")
            );
            return;
        }
        if (newPassword.length < 6) {
            displayWarning(
                "Slaptažodžis turi būti sudarytas iš ne mažiau kaip 6 simbolių.",
                employeeSettings.querySelector(".settings__content"),
                employeeSettings.querySelector("#password-change-form")
            );
            return;
        }
        await axios
            .put(
                CHANGE_USER_PASSWORD_URI,
                { password: currentPassword, newPassword: newPassword },
                data.authHeader
            )
            .then((res) => {
                displaySuccess(
                    res.data.message,
                    employeeSettings.querySelector(".settings__content"),
                    employeeSettings.querySelector("#password-change-form")
                );
            })
            .catch((err) => {
                if (err.response.data.message)
                    displayError(
                        err.response.data.message,
                        employeeSettings.querySelector(".settings__content"),
                        employeeSettings.querySelector("#password-change-form")
                    );
            });
        employeeSettings.querySelector("#password-input").value = "";
        employeeSettings.querySelector("#new-password-input").value = "";
        employeeSettings.querySelector("#repeat-password-input").value = "";
    };

    const updateUserDataHandler = async (e) => {
        e.preventDefault();
        const name = employeeSettings.querySelector("#name-input").value;
        const surname = employeeSettings.querySelector("#surname-input").value;
        const surnamePublic = employeeSettings.querySelector(
            "#show-surname-public"
        ).checked;
        const phone = employeeSettings.querySelector("#phone-input").value;

        if (!name || !phone) {
            displayWarning(
                "Būtina nurodyti informacija: vardą, telefono numerį.",
                employeeSettings.querySelector(".settings__content"),
                employeeSettings.querySelector("#user-info-form")
            );
            return;
        }
        const user = {
            name: name,
            surname: surname,
            surnamePublic: surnamePublic,
            phone: phone,
        };
        await axios
            .put(UPDATE_USER_URI, { user }, data.authHeader)
            .then((res) => {
                displaySuccess(
                    res.data.message,
                    employeeSettings.querySelector(".settings__content"),
                    employeeSettings.querySelector("#user-info-form")
                );
            })
            .catch((err) => {
                if (err.response.data.message)
                    displayError(
                        err.response.data.message,
                        employeeSettings.querySelector(".settings__content"),
                        employeeSettings.querySelector("#user-info-form")
                    );
            });
    };

    // ESSENTIAL VIEW FUNCTIONS:

    const mountView = () => {
        employeeSettings.insertBefore(
            employeeNav(),
            employeeSettings.querySelector(".settings")
        );
        toggleArray.forEach((toggleBtn) => {
            toggleBtn.addEventListener("click", () =>
                sectionToggleHandler(toggleBtn)
            );
        });

        // SET NEW SCHEDULE EVENTS
        radioInputWeekdays.addEventListener("click", () =>
            activeScheduleWeekdayInputs()
        );
        radioEvenDays.addEventListener("click", () =>
            activateScheduleEvenDayInputs()
        );
        radioOddDays.addEventListener("click", () =>
            activateScheduleOddDayInputs()
        );

        addScheduleButton.addEventListener("click", (e) =>
            addScheduleButtonHandler(e)
        );

        // CHANGE PASSWORD EVENTS
        updatePasswordBtn.addEventListener("click", (e) =>
            updatePasswordHandler(e)
        );

        // UPDATE USER DATA EVENTS
        updateUserDataBtn.addEventListener("click", (e) =>
            updateUserDataHandler(e)
        );
    };

    const viewDidMount = () => {
        displaySchedules();
    };

    const unmountView = () => {};

    // - Events

    mountView();

    return { view: employeeSettings, viewDidMount: viewDidMount };
};

export default employeeSettings;
