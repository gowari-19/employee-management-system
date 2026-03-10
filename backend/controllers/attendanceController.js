const Attendance = require("../models/Attendance");

// MARK attendance (login)
exports.createAttendance = async (req, res) => {
  try {
    const { employeeId, date } = req.body;

    // 🔒 Normalize date (ignore time)
    const today = new Date(date);
    today.setHours(0, 0, 0, 0);

    // 🔍 Check if attendance already marked today
    const existingAttendance = await Attendance.findOne({
      employeeId,
      date: today
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance already marked for today"
      });
    }

    // ✅ Mark attendance
    const attendance = await Attendance.create({
      employeeId,
      date: today,
      loginTime: new Date().toLocaleTimeString()
    });

    res.status(201).json(attendance);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// GET all attendance records
exports.getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("employeeId", "name email designation");
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE logout time
exports.updateLogout = async (req, res) => {
  try {
    const record = await Attendance.findByIdAndUpdate(
      req.params.id,
      { logoutTime: req.body.logoutTime },
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE attendance
exports.deleteAttendance = async (req, res) => {
  try {
    const record = await Attendance.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json({ message: "Attendance deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
