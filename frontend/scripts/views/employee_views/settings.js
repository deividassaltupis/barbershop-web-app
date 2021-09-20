import route from "../../modules/route.js";
import employeeNav from "../components/employeeNav.js";

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
                    <button class="settings__button btn-skyblue" type='button'>Išsaugoti</button>
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
                        <input class="input-purple" type="password" id="current-password-input" />
                    </div>
                    <div class="input-group">
                        <label for="surname-input">Pakartoti naują slaptažodį</label>
                        <input class="input-purple" type="password" id="repeat-password-input" />
                    </div>
                    <button class="settings__button btn-purple" type='button'>Atnaujinti slaptažodį</button>
                </form>

                <!-- Employee work schedule form -->
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
                            <input type="checkbox" class="weekday-checkbox" id="checkbox-sunday" data-weekday="7" disabled/>
                            <label for="checkbox-sunday">Sekmadienis</label>
                        </div>
                    </div>
                    <div class="workhours-input-groups-row" id="workhours-weekdays">
                        <div class="workhours__input-group">
                            <input type="text" value="11" class="work-start-hour" disabled/>
                            <span class="workhours__mark">:</span>
                            <input type="text" value="00" class="work-start-min" disabled/>
                        </div>
                        <span class="workhours__dash">-</span>
                        <div class="workhours__input-group">
                            <input type="text" value="22" class="work-start-hour"  disabled/>
                            <span class="workhours__mark">:</span>
                            <input type="text" value="00" class="work-start-min"  disabled/>
                        </div>
                    </div>

                    <div class="radio-group">
                        <input type="radio" name="schedule-type" id="radio-even-days"/>
                        <label for="radio-even-days">Dirbti lyginėmis mėnesio dienomis (2, 4, 6, ...)</label>
                    </div>
                    <div class="workhours-input-groups-row" id="workhours-even-days">
                        <div class="workhours__input-group">
                            <input type="text" value="11" class="work-start-hour"  disabled/>
                            <span class="workhours__mark">:</span>
                            <input type="text" value="00" class="work-start-min"  disabled/>
                        </div>
                        <span class="workhours__dash">-</span>
                        <div class="workhours__input-group">
                            <input type="text" value="22" class="work-end-hour" disabled />
                            <span class="workhours__mark">:</span>
                            <input type="text" value="00" class="work-end-min"  disabled/>
                        </div>
                    </div>

                    <div class="radio-group">
                        <input type="radio" name="schedule-type" id="radio-odd-days"/>
                        <label for="radio-odd-days">Dirbti nelyginėmis mėnesio dienomis (1, 3, 5, ...)</label>
                    </div>
                    <div class="workhours-input-groups-row" id="workhours-odd-days">
                        <div class="workhours__input-group">
                            <input type="text" value="11" class="work-start-hour"  disabled/>
                            <span class="workhours__mark">:</span>
                            <input type="text" value="00" class="work-start-min"  disabled/>
                        </div>
                        <span class="workhours__dash">-</span>
                        <div class="workhours__input-group">
                            <input type="text" value="22" class="work-end-hour"  disabled/>
                            <span class="workhours__mark">:</span>
                            <input type="text" value="00" class="work-end-min"  disabled/>
                        </div>
                    </div>

                    <div class="date-input-row">
                        <p class="date-input-group-label">Nustatyti šį darbo grafiką veikti nuo:</p>
                        <div class="date-input-group">
                            <input type="text" value="2021" class="schedule-start-year" />
                            <span>-</span>
                            <input type="text" value="09" class="schedule-start-month" />
                            <span>-</span>
                            <input type="text" value="30" class="schedule-start-day" />
                        </div>
                        <p class="text-c-blue">(Rekomenduojama data)</p>
                    </div>

                    <p class="py-20">Vėliausias registruotas kliento vizitas numatytas<br>
                    <span id="latest-visit-date-time" class="text-nowrap">2021-09-29 20:30 - 21:35</span></p>

                    <p class="py-20" style="display: none;" id="registrations-cancel-note">Nustačius įsigaliojimui šį darbo grafiką ankščiau negu <span id="recommended-new-schedule-date" class="bold-text text-nowrap ">2021-08-25</span> visi pagal seną darbo grafiką registruoti vizitai laikotarpyje <span class="removed-registrations-period">2021-08-20 - 2021-08-24</span> bus panaikinti, klientams bus išsiųsti informaciniai pranešiai.</p>

                    <button class="settings__button btn-cherry" type='button'>Išsaugoti darbo grafiką</button>
                </form>

                <!-- Employee work schedule list -->
                <div class="settings__section-heading-row">
                    <h2 class="settings__section-heading">Mano darbo grafikai</h2>
                    <button class="settings__section-toggler" type="button" data-box-id="work-schedule-list" style="display: flex;">
                        <img src="styles/images/icons/arrow-down-sign-to-navigate.png" alt="" />
                    </button>
                </div>
                <div class="settings__schedule-list" id="work-schedule-list" style="display: none;">
                    <div class="schedule__item">
                        <div class="schedule__info">
                            <p><span class="bold-text text-c-red">Nebegalioja</span><br>nuo 2021-07-01 iki 2021-07-31</p>
                            <p><span class="bold-text">Darbo dienos:</span> Nelyginės mėnesio dienos</p>
                            <p><span class="bold-text">Darbo valandos:</span> 12:00 - 19:00</p>
                        </div>
                        <button class="button-link text-c-red">Panaikinti grafiką</button>
                    </div>
                    <div class="schedule__item">
                        <div class="schedule__info">
                            <p><span class="bold-text">Galioja</span><br>nuo 2021-08-01 iki 2021-09-30</p>
                            <p><span class="bold-text">Darbo dienos:</span> I, II, III, IV, V</p>
                            <p><span class="bold-text">Darbo valandos:</span> 10:00 - 21:00</p>
                        </div>
                        <button class="button-link text-c-red">Panaikinti grafiką</button>
                    </div>
                    <div class="schedule__item">
                        <div class="schedule__info">
                            <p><span class="bold-text">Galioja</span><br>nuo 2021-10-01 iki 2021-10-29</p>
                            <p><span class="bold-text">Darbo dienos:</span> Lyginės mėnesio dienos</p>
                            <p><span class="bold-text">Darbo valandos:</span> 11:00 - 22:00</p>
                        </div>
                        <button class="button-link text-c-red">Panaikinti grafiką</button>
                    </div>
                </div>

                <!-- Employee work schedule list -->
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

            </div>
        </div>
        `;

    // - Variables

    const toggleArray = employeeSettings.querySelectorAll(
        ".settings__section-toggler"
    );

    const radioInputWeekdays =
        employeeSettings.querySelector("#radio-weekdays");
    const radioEvenDays = employeeSettings.querySelector("#radio-even-days");
    const radioOddDays = employeeSettings.querySelector("#radio-odd-days");

    // - Functions, which run on current View load.

    employeeSettings.insertBefore(
        employeeNav(),
        employeeSettings.querySelector(".settings")
    );

    // - Functions, called by demand

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

    // - Events

    toggleArray.forEach((toggleBtn) => {
        toggleBtn.addEventListener("click", () => {
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
        });
    });

    radioInputWeekdays.addEventListener("click", () => {
        if (radioInputWeekdays.checked) {
            changeWeekdayScheduleInputStates(true);
            changeEvenDaysScheduleInputStates(false);
            changeOddDaysScheduleInputStates(false);
        }
    });
    radioEvenDays.addEventListener("click", () => {
        if (radioEvenDays.checked) {
            changeWeekdayScheduleInputStates(false);
            changeEvenDaysScheduleInputStates(true);
            changeOddDaysScheduleInputStates(false);
        }
    });
    radioOddDays.addEventListener("click", () => {
        if (radioOddDays.checked) {
            changeWeekdayScheduleInputStates(false);
            changeEvenDaysScheduleInputStates(false);
            changeOddDaysScheduleInputStates(true);
        }
    });

    // functions

    const mountView = () => {};

    const viewDidMount = () => {};

    const unmountView = () => {};

    // - Events

    mountView();

    return { view: employeeSettings, viewDidMount: viewDidMount };
};

export default employeeSettings;
