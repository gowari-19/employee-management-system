const API_BASE = "http://localhost:5000/api";

async function loadDashboard() {
  try {
    const res = await fetch(`${API_BASE}/employees`);
    const employees = await res.json();

    const total = employees.length;
    const active = employees.filter(e => e.status === "Active").length;
    const inactive = employees.filter(e => e.status === "Inactive").length;

    document.getElementById("totalEmployees").innerText = total;
    document.getElementById("activeEmployees").innerText = active;
    document.getElementById("inactiveEmployees").innerText = inactive;

  } catch (err) {
    console.error("Dashboard error:", err);
  }
}

loadDashboard();
