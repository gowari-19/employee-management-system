const API_BASE = "http://localhost:5000/api";

const employeeSelect = document.getElementById("employee");
const attendanceForm = document.getElementById("attendanceForm");
const table = document.getElementById("attendanceTable");
const message = document.getElementById("message");

/* ---------------- LOAD EMPLOYEES ---------------- */
async function loadEmployees() {
  const res = await fetch(`${API_BASE}/employees`);
  const employees = await res.json();

  employees.forEach(emp => {
    const opt = document.createElement("option");
    opt.value = emp._id;
    opt.textContent = `${emp.name} (${emp.designation})`;
    employeeSelect.appendChild(opt);
  });
}

/* ---------------- MARK LOGIN ---------------- */
attendanceForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const now = new Date();

  const attendance = {
    employeeId: employeeSelect.value,
    date: now.toISOString().split("T")[0],
    loginTime: now.toLocaleTimeString()
  };

  try {
    const res = await fetch(`${API_BASE}/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attendance)
    });

    if (!res.ok) throw new Error();

    message.innerHTML =
      `<div class="alert alert-success">Login marked successfully</div>`;

    attendanceForm.reset();
    loadAttendance();

  } catch {
    message.innerHTML =
      `<div class="alert alert-danger">Error marking attendance</div>`;
  }
});

/* ---------------- LOAD ATTENDANCE ---------------- */
async function loadAttendance() {
  const res = await fetch(`${API_BASE}/attendance`);
  const records = await res.json();

  table.innerHTML = "";

  records.forEach(rec => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${rec.employeeId?.name || "-"}</td>
      <td>${rec.employeeId?.email || "-"}</td>
      <td>${new Date(rec.date).toLocaleDateString()}</td>
      <td>${rec.loginTime || "-"}</td>
      <td>${rec.logoutTime || "-"}</td>
      <td>
        <span class="badge bg-success">${rec.status}</span>
      </td>
      <td>
        ${
          !rec.logoutTime
            ? `<button class="btn btn-warning btn-sm"
                 onclick="logout('${rec._id}')">Logout</button>`
            : "-"
        }
      </td>
    `;

    table.appendChild(row);
  });
}

/* ---------------- LOGOUT ---------------- */
async function logout(id) {
  const time = new Date().toLocaleTimeString();

  await fetch(`${API_BASE}/attendance/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ logoutTime: time })
  });

  loadAttendance();
}

/* ---------------- INIT ---------------- */
loadEmployees();
loadAttendance();
