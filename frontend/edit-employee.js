const API_BASE = "http://localhost:5000/api";

const params = new URLSearchParams(window.location.search);
const employeeId = params.get("id");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const salaryInput = document.getElementById("salary");
const statusInput = document.getElementById("status");
const message = document.getElementById("message");

/* ---------- LOAD EMPLOYEE DATA ---------- */
async function loadEmployee() {
  const res = await fetch(`${API_BASE}/employees/${employeeId}`);
  const emp = await res.json();

  nameInput.value = emp.name;
  emailInput.value = emp.email;
  salaryInput.value = emp.salary;
  statusInput.value = emp.status;
}

/* ---------- UPDATE EMPLOYEE ---------- */
document.getElementById("editForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedEmployee = {
    name: nameInput.value,
    email: emailInput.value,
    salary: salaryInput.value,
    status: statusInput.value
  };

  try {
    const res = await fetch(`${API_BASE}/employees/${employeeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEmployee)
    });

    if (!res.ok) throw new Error("Update failed");

    window.location.href = "employees.html";

  } catch (err) {
    message.innerHTML =
      `<div class="alert alert-danger">Error updating employee</div>`;
  }
});

loadEmployee();
