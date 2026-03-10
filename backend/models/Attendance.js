const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    loginTime: {
      type: String
    },
    logoutTime: {
      type: String
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Present"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
