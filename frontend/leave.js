const API_BASE = "http://localhost:5000/api";

const leaveForm = document.getElementById("leaveForm");
const employeeSelect = document.getElementById("employeeId");
const message = document.getElementById("message");

const fromDateInput = document.getElementById("fromDate");
const toDateInput = document.getElementById("toDate");

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

/* ---------------- DATE VALIDATION ---------------- */
// When From Date changes, restrict To Date
fromDateInput.addEventListener("change", () => {
  toDateInput.value = "";
  toDateInput.min = fromDateInput.value;
});

/* ---------------- WEEK CHECK ---------------- */
function getWeekRange(dateStr) {
  const date = new Date(dateStr);
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay()); // Sunday
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6); // Saturday
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

/* ---------------- APPLY LEAVE ---------------- */
leaveForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const employeeId = employeeSelect.value;
  const fromDate = fromDateInput.value;
  const toDate = toDateInput.value;

  // BASIC DATE CHECK
  if (toDate < fromDate) {
    message.innerHTML =
      `<div class="alert alert-danger">
        To Date cannot be before From Date
      </div>`;
    return;
  }

  try {
    // FETCH PREVIOUS LEAVES OF EMPLOYEE
    const res = await fetch(`${API_BASE}/leaves`);
    const leaves = await res.json();

    const { start, end } = getWeekRange(fromDate);

    const alreadyApplied = leaves.some(l =>
      l.employeeId === employeeId &&
      new Date(l.fromDate) >= start &&
      new Date(l.fromDate) <= end
    );

    if (alreadyApplied) {
      message.innerHTML =
        `<div class="alert alert-warning">
          You have already applied for leave this week.
          Only one leave request per week is allowed.
        </div>`;
      return;
    }

    // SUBMIT LEAVE
    const leave = {
      employeeId,
      leaveType: document.getElementById("leaveType").value,
      fromDate,
      toDate,
      reason: document.getElementById("reason").value
    };

    const saveRes = await fetch(`${API_BASE}/leaves`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leave)
    });

    if (!saveRes.ok) throw new Error("Failed");

    message.innerHTML =
      `<div class="alert alert-success">
        Leave applied successfully
      </div>`;

    leaveForm.reset();
    toDateInput.min = "";

  } catch (err) {
    message.innerHTML =
      `<div class="alert alert-danger">
        Error applying leave
      </div>`;
  }
});

/* ---------------- INIT ---------------- */
loadEmployees();
