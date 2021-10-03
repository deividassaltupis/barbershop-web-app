import { EMPLOYEE_GET_REGISTRATIONS_URI } from "../../utils/endpoints.js";

const monthNames = [
    "Sausis",
    "Vasaris",
    "Kovas",
    "Balandis",
    "Gegužė",
    "Birželis",
    "Liepa",
    "Rugpjūtis",
    "Rugsėjis",
    "Spalis",
    "Lapkritis",
    "Gruodis",
];

const getDaysOfMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const fetchRegistrations = async (dateFilter, authHeader) => {
    const regArr = await axios
        .post(EMPLOYEE_GET_REGISTRATIONS_URI, dateFilter, authHeader)
        .then((res) => res.data.regArr)
        .catch((err) => {
            console.log(err);
        });
    return regArr;
};

const getRegistrationsOfGivenDate = async (startDate, endDate, authHeader) => {
    let dateFilter = {};

    dateFilter = {
        startDate,
        endDate,
    };
    console.log(dateFilter);
    let regArr = await fetchRegistrations(dateFilter, authHeader);
    regArr = regArr.filter((reg) => reg.visitStatus === 2);
    return regArr.length;
};

const getPastSixMonthsRegistrations = async (authHeader) => {
    const monthLabels = [];
    const regCounts = [];

    const date = new Date();

    for (let i = 0; i < 6; i++) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysOfMonth = getDaysOfMonth(year, month);

        const startDate = new Date(year, month, 1, 0, 0);
        const endDate = new Date(year, month, daysOfMonth, 23, 59);
        console.log(daysOfMonth);

        const regCount = await getRegistrationsOfGivenDate(
            startDate,
            endDate,
            authHeader
        );
        regCounts.push(regCount);
        monthLabels.push(monthNames[month]);

        date.setMonth(date.getMonth() - 1);
    }
    return { monthLabels, regCounts };
};

const employeeChart = async (chartElementID, authHeader) => {
    let { monthLabels, regCounts } = await getPastSixMonthsRegistrations(
        authHeader
    );
    monthLabels = monthLabels.reverse();
    regCounts = regCounts.reverse();

    const labels = monthLabels;
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Klientai",
                backgroundColor: "rgb(10, 10, 238)",
                borderColor: "rgb(10, 10, 238)",
                data: regCounts,
            },
        ],
    };
    const config = {
        type: "line",
        data: chartData,
        options: {
            scales: {
                y: {
                    ticks: {
                        stepSize: 1,
                    },
                },
            },
        },
    };
    var statisticsChart = new Chart(
        document.getElementById(chartElementID),
        config
    );
};

export default employeeChart;
