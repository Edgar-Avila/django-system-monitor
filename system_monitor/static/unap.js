const codeForm = document.getElementById('codeForm');
const studentInfo = document.getElementById('studentInfo');

const getStudentInfo = async (code) => {
  const url = `/system_monitor/unap?code=${code}`
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const fillData = (data) => {
  studentInfo.innerHTML = `
    <p><strong>Nombre:</strong> ${data?.estudiante?.nombres}</p>
    <p><strong>Escuela:</strong> ${data?.estudiante?.escuela}</p>
    <p><strong>Facultad:</strong> ${data?.estudiante?.dni}</p>
  `;
  if(data.status) {
    studentInfo.innerHTML += `<p><strong>Tiene deudas:</strong> Sí</p>`;
    studentInfo.innerHTML += `<p><strong>Deuda:</strong> ${data?.deuda}</p>`;
  }
  else {
    studentInfo.innerHTML += `<p><strong>Tiene deudas:</strong> No</p>`;
  }
}

codeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(codeForm);
  const code = formData.get('code');
  const data = await getStudentInfo(code);
  fillData(data);
});
