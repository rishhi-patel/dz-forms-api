const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const {
  createForm,
  updateForm,
  getFormDetails,
  getFormList,
  submitResponse,
  getSingleResponse,
  getSingleFormResponses,
} = require("../controller/formController");

const router = express.Router();

router.route("/").post(createForm).get(getFormDetails);
router.route("/find").get(getFormList);
router.route("/update").post(updateForm);
router.route("/response").post(submitResponse).get(getSingleResponse);
router.route("/response/all").get(getSingleFormResponses);

// router.route("/delete");

module.exports = router;
