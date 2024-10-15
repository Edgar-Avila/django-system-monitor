const getBtn = document.getElementById("getBtn");
const chartsContainer = document.getElementById("chartsContainer");

const createChart = (id) => {
  const div = document.createElement("div");
  div.className = "col-12 col-sm-6 col-md-4 position-relative";
  const canvas = document.createElement("canvas");
  canvas.id = `chart-${id}`;
  div.appendChild(canvas);
  return div;
};

const getInfo = async () => {
  const response = await fetch("/system_monitor/disk");
  const data = await response.json();
  return Object.entries(data).map(([mountpoint, info]) => ({
    mountpoint,
    id: mountpoint.replace(/\//g, "-"),
    ...info,
  }));
};

const clearChart = (chart) => {
  if (chart) {
    chart.clear();
    chart.destroy();
  }
};

const fillChart = async (data) => {
  const chartCtx = document.getElementById(`chart-${data.id}`).getContext("2d");
  return new Chart(chartCtx, {
    type: "doughnut",
    data: {
      labels: ["Usado", "Libre"],
      datasets: [
        {
          label: "Espacio en disco (GB)",
          data: [data.used_space, data.free_space],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `${data.mountpoint}`,
        },
        subtitle: {
          display: true,
          text: `Total: ${data.total_space.toFixed(3)} GB`,
        }
      },
    },
  });
};

const getInfoAndFillCharts = async () => {
  const data = await getInfo();
  chartsContainer.innerHTML = "";
  data.forEach((info) => {
    const chartDiv = createChart(info.id);
    chartsContainer.appendChild(chartDiv);
    fillChart(info);
  });

  return data;
}

getBtn.addEventListener("click", getInfoAndFillCharts);
window.addEventListener("load", getInfoAndFillCharts);
