const API_BASE = "http://localhost:5000/api";

/* ---------------- DOM ELEMENTS ---------------- */
const employeeForm = document.getElementById("employeeForm");
const message = document.getElementById("message");

const name = document.getElementById("name");
const email = document.getElementById("email");
const dob = document.getElementById("dob");
const ageInput = document.getElementById("age");
const department = document.getElementById("department");
const designation = document.getElementById("designation");
const salary = document.getElementById("salary");
const status = document.getElementById("status");
const joiningDate = document.getElementById("joiningDate");

/* ---------------- AGE CALCULATION ---------------- */
dob.addEventListener("change", () => {
  if (!dob.value) return;

  const dobDate = new Date(dob.value);
  const today = new Date();

  let age = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }

  ageInput.value = age + " years";
});

/* ---------------- LOAD DEPARTMENTS ---------------- */
async function loadDepartments() {
  const res = await fetch(`${API_BASE}/departments`);
  const departments = await res.json();

  departments.forEach(dep => {
    const opt = document.createElement("option");
    opt.value = dep._id;
    opt.textContent = dep.name;
    department.appendChild(opt);
  });
}

/* ---------------- LOAD DESIGNATIONS ---------------- */
department.addEventListener("change", (e) => {
    designation.value = ""; // 🔥 reset old designation

  loadDesignations(e.target.value);
});

async function loadDesignations(departmentId) {
  if (!departmentId) return;

  const res = await fetch(`${API_BASE}/designations`);
  const designations = await res.json();

  designation.innerHTML = `<option value="">Select Designation</option>`;

  designations.forEach(des => {
    if (des.departmentId._id === departmentId) {
      const opt = document.createElement("option");
      opt.value = des.title; // MUST be string
      opt.textContent = `${des.title} (${des.level})`;
      designation.appendChild(opt);
    }
  });
}

/* ---------------- FORM SUBMIT ---------------- */
employeeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const employee = {
    name: name.value,
    email: email.value,
    dob: dob.value,
    designation: designation.value,
    salary: salary.value,
      joiningDate: joiningDate.value, // ✅ ADD THIS

    departmentId: department.value
  };

  console.log("SENDING:", employee);

  try {
    const res = await fetch(`${API_BASE}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }

    window.location.href = "employees.html";

  } catch (err) {
    message.innerHTML =
      `<div class="alert alert-danger">${err.message}</div>`;
  }
});

/* ---------------- INIT ---------------- */
loadDepartments();
