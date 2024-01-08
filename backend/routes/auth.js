const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_Secret = "yehnhbatasakta";
const fetchuser = require("../midlewere/fetchuser");

const { body, validationResult } = require("express-validator");

// Create a user using: POST "/api/auth/createuser". Doesn't require Auth
router.post(
  "/createuser",
  [
    body("name", "Enter Your Name").isLength({ min: 3 }),
    body("password", "Enter a Password").isLength({ min: 5 }),
    body("email", "Enter a valid Email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check wether the email already exists

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry this email is already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, jwt_Secret);
      res.json({ authToken });
    } catch (error) {
      console.error(error.massage);
      res.status(500).json("Some Error over here");
    }
  }
);

// authencation a user using: POST "/api/auth/createuser". Doesn't require login
router.post(
  "/login",
  [
    body("email", "Enter Your Name").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Incorrect email or password" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Incorrect email or password" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, jwt_Secret);
      res.json({ authToken });
    } catch (error) {
      console.error(error.massage);
      res.status(500).send("Some Error over here");
    }
  }
);
// Get a loggined user dat using: POST "/api/auth/getuser".  required login
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.massage);
    res.status(500).send("Some Error over here");
  }
});

module.exports = router;
