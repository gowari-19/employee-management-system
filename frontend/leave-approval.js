const API_BASE = "http://localhost:5000/api";
const table = document.getElementById("leaveTable");

/* ---------------- LOAD LEAVES ---------------- */
async function loadLeaves() {
  const res = await fetch(`${API_BASE}/leaves`);
  const leaves = await res.json();

  table.innerHTML = "";

  leaves.forEach(leave => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${leave.employeeId?.name || "-"}</td>
      <td>${leave.employeeId?.designation || "-"}</td>
      <td>${leave.leaveType}</td>
      <td>${new Date(leave.fromDate).toLocaleDateString()}</td>
      <td>${new Date(leave.toDate).toLocaleDateString()}</td>
      <td>${leave.reason || "-"}</td>
      <td>
        <span class="badge ${
          leave.status === "Approved" ? "bg-success" :
          leave.status === "Rejected" ? "bg-danger" : "bg-warning text-dark"
        }">
          ${leave.status}
        </span>
      </td>
      <td>
        <button class="btn btn-success btn-sm mb-1"
          onclick="updateStatus('${leave._id}', 'Approved')">
          Approve
        </button>

        <button class="btn btn-danger btn-sm mb-1"
          onclick="updateStatus('${leave._id}', 'Rejected')">
          Reject
        </button>

        <button class="btn btn-outline-danger btn-sm"
          onclick="deleteLeave('${leave._id}')">
          Delete
        </button>
      </td>
    `;

    table.appendChild(row);
  });
}

/* ---------------- UPDATE STATUS ---------------- */
async function updateStatus(id, status) {
  await fetch(`${API_BASE}/leaves/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });

  loadLeaves();
}

/* ---------------- DELETE LEAVE ---------------- */
async function deleteLeave(id) {
  if (!confirm("Delete this leave request?")) return;

  await fetch(`${API_BASE}/leaves/${id}`, {
    method: "DELETE"
  });

  loadLeaves();
}

/* ---------------- INIT ---------------- */
loadLeaves();
