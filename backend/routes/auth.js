const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "itsgonnabeoursecret";

// Create a User using: POST "/api/auth/createuser" No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a name with atleast 3 character").isLength({ min: 3 }),
    body("email", "Enter valid Email").isEmail(),
    body("password", "Password must be atleast 6 character").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secpwd = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secpwd,
    })
      .then((user) => res.json(user))
      .catch((err) =>
        res.status(500).send("something went wrong user not created!")
      );
  }
);

// Login User using: POST "/api/auth/login" No login required
router.post(
  "/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
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
        return res
          .status(400)
          .json({ error: "please enter valid email or password" });
      }
      const pwdCompare = await bcrypt.compare(password, user.password);
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ error: "please enter valid email or password" });
      }
      const data = {
        user: { id: user.id },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log("user:", user);
      res.json({ authToken }); //ES6: for sending data like authToken:authToken
    } catch (err) {
      res.status(500).send("something went wrong!");
    }
  }
);

// Get Logged in User Details: GET "/api/auth/authuser" login required
router.post("/authuser", async (req, res) => {
  try {
    const user_id = "dhruvin";
    const user = await User.findOne(user_id).select("-password"); // get user data of all the fields except the password field
  } catch (err) {
    res.status(500).send("something went wrong!");
  }
});
module.exports = router;
