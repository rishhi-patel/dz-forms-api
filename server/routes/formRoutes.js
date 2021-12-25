const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const { createForm, updateForm } = require("../controller/formController");

const router = express.Router();

router.route("/").post(createForm);
router.route("/update").post(updateForm);

// router.route("/delete");

module.exports = router;
