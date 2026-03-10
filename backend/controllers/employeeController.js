const Employee = require("../models/Employee");
const Department = require("../models/Department");
const { calculateAge, calculateExperience } = require("../utils/employeeFunctions");

exports.createEmployee = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // 🔍 DEBUG

    const { designation, departmentId } = req.body;

    // 1️⃣ Check Department
    const Designation = require("../models/Designation");
const validDesignation = await Designation.findOne({
  title: designation,
  departmentId: departmentId
});

if (!validDesignation) {
  return res.status(400).json({
    message: "Invalid designation for selected department"
  });
}

    // 3️⃣ Create Employee
    const employee = await Employee.create({
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
joiningDate: req.body.joiningDate,
      salary: req.body.salary,
      status: req.body.status,
      departmentId,
      designation // STRING saved
    });

    res.status(201).json(employee);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all Employees (WITH Department details)
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("departmentId", "name code");

    const result = [];

    // 🔁 CURSOR logic (loop record by record)
    for (let emp of employees) {
      result.push({
        ...emp._doc,
        age: calculateAge(emp.dob),
        experience: calculateExperience(emp.joiningDate)
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET Employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("departmentId", "name code");

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Employee
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE Employee (Hard delete – allowed)
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
