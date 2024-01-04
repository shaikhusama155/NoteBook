const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a user using: POST "/api/auth/createuser". Doesn't require Auth
router.post("/createuser", [
  body('name', "Enter Your Name").isLength({ min: 3 }),
  body('password', "Enter a Password").isLength({ min: 5 }),
  body('email', "Enter a valid Email").isEmail(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
//check wether the email already exists

try {
  
let user = await User.findOne({email: req.body.email})
if(user){
  return res.status(400).json({error: "Sorry this email is already exists"})
}
 user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }) 
  res.json({"nice":"nice"});
} catch (error) {
  console.error(error.massage)
  res.status(500).json("Some Error over here")
}
  });
  
//   .then(user => res.json(user))
//   .catch(err=> {console.log(err)
//   res.json({error: 'Please Enter a Unique Email'})} )

module.exports = router;
