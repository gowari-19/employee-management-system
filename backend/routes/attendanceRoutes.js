const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.post("/", attendanceController.createAttendance);
router.get("/", attendanceController.getAttendance);
router.put("/:id", attendanceController.updateLogout);
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;
