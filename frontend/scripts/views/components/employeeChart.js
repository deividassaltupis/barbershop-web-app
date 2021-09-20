const employeeChart = (chartElementID) => {
    const labels = [
        "Liepa",
        "Rugpjūtis",
        "Rugsėjis",
        "Spalis",
        "Lapkritis",
        "Gruodis",
        "Sausis",
    ];
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Klientai",
                backgroundColor: "rgb(10, 10, 238)",
                borderColor: "rgb(10, 10, 238)",
                data: [0, 0, 0, 10, 31, 65, 101],
            },
        ],
    };
    const config = {
        type: "line",
        data: chartData,
        options: {},
    };
    var statisticsChart = new Chart(
        document.getElementById(chartElementID),
        config
    );
};

export default employeeChart;
