const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a user using: POST "/api/auth/". Doesn't require Auth
router.post("/", [
  body('name', "Enter Your Name").isLength({ min: 3 }),
  body('password', "Enter a Password").isLength({ min: 5 }),
  body('email', "Enter a valid Email").isEmail(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then(user => res.json(user));
});

module.exports = router;
