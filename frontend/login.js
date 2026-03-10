function login() {
  const role = document.getElementById("role").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Demo credentials (frontend only)
  if (
    (role === "admin" && username === "admin" && password === "admin") ||
    (role === "employee" && username === "employee" && password === "employee")
  ) {
    localStorage.setItem("role", role);

    if (role === "admin") {
      window.location.href = "dashboard.html";
    } else {
  window.location.href = "employee-dashboard.html";    }
  } else {
    alert("Invalid login credentials");
  }
}
