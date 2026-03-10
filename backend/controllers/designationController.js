const Designation = require("../models/Designation");

// CREATE designation
exports.createDesignation = async (req, res) => {
  try {
    const designation = await Designation.create(req.body);
    res.status(201).json(designation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all designations
exports.getDesignations = async (req, res) => {
  try {
    const designations = await Designation.find()
      .populate("departmentId", "name code");
    res.status(200).json(designations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET designation by ID
exports.getDesignationById = async (req, res) => {
  try {
    const designation = await Designation.findById(req.params.id)
      .populate("departmentId", "name code");

    if (!designation) {
      return res.status(404).json({ message: "Designation not found" });
    }

    res.status(200).json(designation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE designation
exports.updateDesignation = async (req, res) => {
  try {
    const designation = await Designation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!designation) {
      return res.status(404).json({ message: "Designation not found" });
    }

    res.status(200).json(designation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE designation
exports.deleteDesignation = async (req, res) => {
  try {
    const designation = await Designation.findByIdAndDelete(req.params.id);

    if (!designation) {
      return res.status(404).json({ message: "Designation not found" });
    }

    res.status(200).json({ message: "Designation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
