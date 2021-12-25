const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const {
  authUser,
  registerUser,
  getUserDetails,
} = require("../controller/userController");

const router = express.Router();

router.post("/users/login", authUser);
router.route("/users").post(registerUser).get(getUserDetails);

module.exports = router;
