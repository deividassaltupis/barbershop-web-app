import route from "../../modules/route.js";
import employeeNav from "../components/employeeNav.js";
import { EMPLOYEE_GET_REGISTRATIONS_URI } from "../../utils/endpoints.js";

const employeeDashboard = (data = {}) => {
    let employeeDashboard = document.createElement("div");
    employeeDashboard.id = "employee-dashboard";
    employeeDashboard.innerHTML =
        /*html*/
        `
        <div class='dashboard'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Darbuotojo darbalaukis</span></h2>
            </div>
            <div class='dashboard__content'>
                <div class="dashboard__statistics-row">
                    <div class='dashboard__statistics-item'>
                        <img src="styles/images/icons/customer.png" alt="" />
                        <p class="dashboard__item-title">Viso klientų aptarnauta per einamąjį mėnesį</p>
                        <span class="dashboard__item-value" id='client-count'>0</span>
                    </div>
                    <div class='dashboard__statistics-item'>
                        <img src="styles/images/icons/profits.png" alt="" />
                        <p class="dashboard__item-title">Šio mėnesio pajamos</p>
                        <span class="dashboard__item-value" id="profit-value">0 &euro;</span>
                    </div>
                </div>
                <div class="dashboard__chart-box">
                    <canvas id="statisticsChart"></canvas>
                </div>
            </div>
        </div>
        `;

    const clientCountElement = employeeDashboard.querySelector("#client-count");
    const profitValueElement = employeeDashboard.querySelector("#profit-value");

    const getDaysOfMonth = (year, month) =>
        new Date(year, month + 1, 0).getDate();

    const fetchRegistrations = async (dateFilter) => {
        const regArr = await axios
            .post(EMPLOYEE_GET_REGISTRATIONS_URI, dateFilter, data.authHeader)
            .then((res) => res.data.regArr)
            .catch((err) => {
                if (err.response.data.message)
                    displayError(
                        err.response.data.message,
                        employeeDashboard.querySelector(".dashboard__content"),
                        employeeDashboard.querySelector(
                            ".dashboard__statistics-row"
                        )
                    );
            });
        return regArr;
    };

    const fetchCurrentMonthRegistrations = async () => {
        let dateFilter = {};
        const nowDate = new Date();

        const year = nowDate.getFullYear();
        const month = nowDate.getMonth();

        const daysOfMonth = getDaysOfMonth(year, month);

        const startDate = new Date(year, month, 1, 0, 0);
        const endDate = new Date(year, month, daysOfMonth, 23, 59);

        dateFilter = {
            startDate,
            endDate,
        };

        return await fetchRegistrations(dateFilter);
    };

    const displayClientAndProfitCount = async () => {
        const regArr = await fetchCurrentMonthRegistrations();
        let profit = 0;
        let clients = 0;
        regArr.forEach((reg) => {
            if (reg.visitStatus === 2) {
                profit += reg.servicePrice;
                clients++;
            }
        });
        clientCountElement.innerHTML = `${clients}`;
        profitValueElement.innerHTML = `${profit} &euro;`;
    };

    const mountView = () => {
        employeeDashboard.insertBefore(
            employeeNav(),
            employeeDashboard.querySelector(".dashboard")
        );
    };

    const viewDidMount = () => {
        displayClientAndProfitCount();
    };

    const unmountView = () => {};

    // - Events

    mountView();

    return { view: employeeDashboard, viewDidMount: viewDidMount };
};

export default employeeDashboard;
