function checkAuth(requiredRole) {
  const role = localStorage.getItem("role");

  if (!role) {
    window.location.replace("login.html");
    return;
  }

  if (requiredRole && role !== requiredRole) {
    alert("Access denied");
    window.location.replace("login.html");
  }
}

function logout() {
  localStorage.clear();
  window.location.replace("login.html");
}
  