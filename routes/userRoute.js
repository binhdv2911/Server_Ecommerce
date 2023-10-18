const express = require("express");
const router = express.Router();

const {
  login,
  getUser,
  register,
  profile,
} = require("../controller/userController");

router.post("/login", login);
router.post("/register", register);
router.get("/profile/:username", profile);
router.get("/", getUser);

module.exports = router;
