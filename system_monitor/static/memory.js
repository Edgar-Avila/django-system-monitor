const getBtn = document.getElementById("getBtn");
const myChart = document.getElementById("myChart");
const chartCtx = myChart.getContext("2d");

const getInfo = async () => {
  const response = await fetch("/system_monitor/memory");
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
  clearChart(window.chart);
  window.chart = new Chart(chartCtx, {
    type: "doughnut",
    data: {
      labels: ["Usado", "Libre"],
      datasets: [
        {
          label: "Memoria (GB)",
          data: [data.used_memory, data.available_memory],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: `Total: ${data.total_memory.toFixed(3)} GB`,
        },
      },
    },
  });
};

getBtn.addEventListener("click", getInfoAndFillChart);
window.addEventListener("load", getInfoAndFillChart);
