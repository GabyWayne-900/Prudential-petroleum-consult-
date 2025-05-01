// Select HTML elements to update sensor readings
const pressureElement = document.getElementById("pressure");
const temperatureElement = document.getElementById("temperature");
const flowRateElement = document.getElementById("flowRate");

// Function to generate random sensor values
function generateRandomValue(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

// Function to update sensor values
function updateSensorValues() {
    const newPressure = generateRandomValue(20, 100);
    const newTemperature = generateRandomValue(10, 80);
    const newFlowRate = generateRandomValue(5, 50);

    // Update the HTML elements
    pressureElement.textContent = newPressure;
    temperatureElement.textContent = newTemperature;
    flowRateElement.textContent = newFlowRate;

    // Add new values to the chart
    addDataToChart(newPressure, newTemperature, newFlowRate);
}

// Chart.js Configuration
const ctx = document.getElementById("sensorChart").getContext("2d");
const sensorChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [],
        datasets: [
            {
                label: "Pressure (PSI)",
                borderColor: "#ff5733",
                backgroundColor: "rgba(255, 87, 51, 0.2)",
                data: [],
                fill: true,
            },
            {
                label: "Temperature (°C)",
                borderColor: "#33ff57",
                backgroundColor: "rgba(51, 255, 87, 0.2)",
                data: [],
                fill: true,
            },
            {
                label: "Flow Rate (L/min)",
                borderColor: "#3385ff",
                backgroundColor: "rgba(51, 133, 255, 0.2)",
                data: [],
                fill: true,
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: "Time" } },
            y: { title: { display: true, text: "Values" } },
        },
    },
});

// Function to add data to the chart
function addDataToChart(pressure, temperature, flowRate) {
    const timeLabel = new Date().toLocaleTimeString();

    // Shift old data if more than 10 entries exist
    if (sensorChart.data.labels.length >= 10) {
        sensorChart.data.labels.shift();
        sensorChart.data.datasets.forEach(dataset => dataset.data.shift());
    }

    // Add new data
    sensorChart.data.labels.push(timeLabel);
    sensorChart.data.datasets[0].data.push(pressure);
    sensorChart.data.datasets[1].data.push(temperature);
    sensorChart.data.datasets[2].data.push(flowRate);

    // Update the chart
    sensorChart.update();
}

// Set an interval to update sensor values every 3 seconds
setInterval(updateSensorValues, 3000);