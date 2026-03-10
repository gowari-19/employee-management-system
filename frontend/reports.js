const API_BASE = "http://localhost:5000/api";

const attendanceDateInput = document.getElementById("attendanceDate");
const attendanceTable = document.getElementById("attendanceReportTable");

const leaveStatusSelect = document.getElementById("leaveStatus");
const leaveTable = document.getElementById("leaveReportTable");

/* ---------------- ATTENDANCE REPORT ---------------- */
attendanceDateInput.addEventListener("change", loadAttendanceReport);

async function loadAttendanceReport() {
  const selectedDate = attendanceDateInput.value;
  if (!selectedDate) return;

  const res = await fetch(`${API_BASE}/attendance`);
  const records = await res.json();

  attendanceTable.innerHTML = "";

const filtered = records.filter(rec => {
  const recordDate = new Date(rec.date);
  const yyyy = recordDate.getFullYear();
  const mm = String(recordDate.getMonth() + 1).padStart(2, "0");
  const dd = String(recordDate.getDate()).padStart(2, "0");

  const localDate = `${yyyy}-${mm}-${dd}`;
  return localDate === selectedDate;
});


  if (filtered.length === 0) {
    attendanceTable.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-danger">
          No attendance records found
        </td>
      </tr>`;
    return;
  }

  filtered.forEach(rec => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${rec.employeeId?.name || "-"}</td>
      <td>${new Date(rec.date).toLocaleDateString()}</td>
      <td>${rec.loginTime || "-"}</td>
      <td>${rec.logoutTime || "-"}</td>
      <td>${rec.status}</td>
    `;

    attendanceTable.appendChild(row);
  });
}

/* ---------------- LEAVE REPORT ---------------- */
leaveStatusSelect.addEventListener("change", loadLeaveReport);

async function loadLeaveReport() {
  const status = leaveStatusSelect.value;

  const res = await fetch(`${API_BASE}/leaves`);
  const leaves = await res.json();

  leaveTable.innerHTML = "";

  const filtered = status
    ? leaves.filter(l => l.status === status)
    : leaves;

  if (filtered.length === 0) {
    leaveTable.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-danger">
          No leave records found
        </td>
      </tr>`;
    return;
  }

  filtered.forEach(l => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${l.employeeId?.name || "-"}</td>
      <td>${l.leaveType}</td>
      <td>${new Date(l.fromDate).toLocaleDateString()}</td>
      <td>${new Date(l.toDate).toLocaleDateString()}</td>
      <td>${l.status}</td>
    `;

    leaveTable.appendChild(row);
  });
}
