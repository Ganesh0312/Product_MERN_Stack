const express = require("express");
const router = express.Router();
const {
  loginAdminController,
  addAdminController,
  forgotPasswordController,
} = require("../Controllers/AdminController");

router.post("/login", loginAdminController);
router.post("/register", addAdminController);

router.post("/forgot-password", forgotPasswordController);

module.exports = router;
