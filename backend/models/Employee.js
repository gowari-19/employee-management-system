const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    dob: { 
      type: Date, 
      required: true },
    designation: {
      type: String,
      required: true
    },
    joiningDate: {
      type: Date,
      required: true
    },
    salary: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    },

    // 🔗 LINK WITH DEPARTMENT
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
// 🔥 TRIGGER: after employee insert
employeeSchema.post("save", function (doc) {
  console.log(`TRIGGER: Employee created - ${doc.name}`);
});

// 🔥 TRIGGER: after employee delete
employeeSchema.post("findOneAndDelete", function (doc) {
  if (doc) {
    console.log(`TRIGGER: Employee deleted - ${doc.name}`);
  }
});

module.exports = mongoose.model("Employee", employeeSchema);
