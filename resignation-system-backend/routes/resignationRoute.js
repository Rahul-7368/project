const express = require("express");
const {
  submitResignation,
  getAllResignations,
  concludeResignation,
} = require("../controllers/resignationController");
const { auth, isHR } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/submit", auth, submitResignation);
router.get("/all", auth, isHR, getAllResignations);
router.put("/conclude/:id", auth, isHR, concludeResignation);

module.exports = router;
