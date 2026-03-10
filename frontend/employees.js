const API_BASE = "http://localhost:5000/api";
const table = document.getElementById("employeeTable");

/* ---------------- LOAD EMPLOYEES ---------------- */
async function loadEmployees() {
  try {
    const res = await fetch(`${API_BASE}/employees`);
    const employees = await res.json();

    table.innerHTML = "";

    employees.forEach(emp => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.departmentId?.name || "-"}</td>
        <td>${emp.designation}</td>
        <td>${emp.age} yrs</td>
        <td>${emp.experience} yrs</td>
        <td>₹ ${emp.salary}</td>
        <td>
          <span class="badge ${emp.status === "Active" ? "bg-success" : "bg-secondary"}">
            ${emp.status}
          </span>
        </td>
        <td>
  <a href="edit-employee.html?id=${emp._id}" 
     class="btn btn-warning btn-sm me-1">
    Edit
  </a>

  <button class="btn btn-danger btn-sm"
          onclick="deleteEmployee('${emp._id}')">
    Delete
  </button>
</td>

      `;

      table.appendChild(row);
    });

  } catch (err) {
    console.error("Error loading employees:", err);
  }
}

/* ---------------- DELETE EMPLOYEE ---------------- */
async function deleteEmployee(id) {
  if (!confirm("Are you sure you want to delete this employee?")) return;

  await fetch(`${API_BASE}/employees/${id}`, {
    method: "DELETE"
  });

  loadEmployees();
}

/* ---------------- INIT ---------------- */
loadEmployees();
