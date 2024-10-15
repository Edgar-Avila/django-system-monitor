const getBtn = document.getElementById("getBtn");
const myChart = document.getElementById("myChart");
const chartCtx = myChart.getContext("2d");

const getInfo = async () => {
  const response = await fetch("/system_monitor/cpu");
  const data = await response.json();
  return data;
};

const clearChart = (chart) => {
  if (chart) {
    chart.clear();
    chart.destroy();
  }
};

const getInfoAndFillChart = async () => {
  const data = await getInfo();
  const labels = Object.keys(data.cpu_usage_per_core).map(
    (core) => `Core ${core}`,
  );
  const backgroundColors = labels.map(
    () =>
      `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
  );
  const values = Object.values(data.cpu_usage_per_core);

  clearChart(window.chart);
  window.chart = new Chart(chartCtx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Uso (%)",
          data: values,
          backgroundColor: backgroundColors,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
        },
      },
      plugins: {
        title: {
          display: true,
          text: `Total: ${data.total_cpu_usage.toFixed(3)} GB`,
        },
      },
    },
  });
};

getBtn.addEventListener("click", getInfoAndFillChart);
window.addEventListener("load", getInfoAndFillChart);
