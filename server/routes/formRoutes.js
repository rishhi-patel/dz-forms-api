const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const {
  createForm,
  updateForm,
  getFormDetails,
} = require("../controller/formController");

const router = express.Router();

router.route("/").post(createForm).get(getFormDetails);
router.route("/update").post(updateForm);

// router.route("/delete");

module.exports = router;
