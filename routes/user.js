const express = require("express");
const router = express();
const auth = require("../middleware/auth");
const {
  signup,
  signin,
  welcome,
} = require("../controllers/auth.controller.js");
// registration api

router.post("/register", signup);

// login api
router.post("/login", signin);

// welcome api

router.post("/welcome", auth, welcome);

module.exports = router;
