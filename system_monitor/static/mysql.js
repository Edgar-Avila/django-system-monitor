const getBtn = document.getElementById("getBtn");
const info = document.getElementById("info");

const fillData = (data) => {
  if(data.running) {
    info.innerHTML = `<p><strong>El servicio está ejecutandose:</strong> Sí</p>`;
  }
  else {
    info.innerHTML = `<p><strong>El servicio está ejecutandose:</strong> No</p>`;
  }
}

const getData = async () => {
  const url = `/system_monitor/mysql`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const getAndFillData = async () => {
  const data = await getData();
  fillData(data);
}

getBtn.addEventListener("click", getAndFillData);
window.addEventListener("load", getAndFillData);

