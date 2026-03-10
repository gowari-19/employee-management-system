const mongoose = require("mongoose");

const designationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: String,
      enum: ["Junior", "Mid", "Senior"],
      required: true
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Designation", designationSchema);
