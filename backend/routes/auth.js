const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');


//create a user by using : POST  "/api/auth/". Doesn't require Auth
router.get("/",[
  body('name', "Enter Your Name").isLength({min: 3}),
  body('password', "Enter a Password").isLength({min: 5}),
  body('email', "Enter a valid Email").isEmail(),
], (req, res) => {
const error = validationResult(req);
if(!error.isEmpty()){
  return res.status(400).json({error: error.array() });
}
  res.send(req.body);
});

module.exports = router;
