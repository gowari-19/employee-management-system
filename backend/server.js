const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const departmentRoutes = require("./routes/departmentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const designationRoutes = require("./routes/designationRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const leaveRoutes = require("./routes/leaveRoutes");

const app = express();

app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/EmployeeDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// ROUTES
app.use("/api/departments", departmentRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/designations", designationRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);


const PORT = 5000;
// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Default route
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
