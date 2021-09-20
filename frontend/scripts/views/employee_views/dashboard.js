import route from "../../modules/route.js";
import employeeNav from "../components/employeeNav.js";

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
                        <span class="dashboard__item-value">129</span>
                    </div>
                    <div class='dashboard__statistics-item'>
                        <img src="styles/images/icons/profits.png" alt="" />
                        <p class="dashboard__item-title">Šio mėnesio pajamos</p>
                        <span class="dashboard__item-value">2040 &euro;</span>
                    </div>
                </div>
                <div class="dashboard__chart-box">
                    <canvas id="statisticsChart"></canvas>
                </div>
            </div>
        </div>
        `;

    employeeDashboard.insertBefore(
        employeeNav(),
        employeeDashboard.querySelector(".dashboard")
    );

    return employeeDashboard;
};

export default employeeDashboard;