// registration form

const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register user
router.post("/register", async (req, res) => {
  try {
   const user = await User.create({
  name: `${req.body.firstName} ${req.body.lastName}`,
  email: req.body.email,
  password: req.body.password
});
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});



// for login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    res.json({
      message: "Login successful",
      user
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// skill teach
router.put("/teach/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        skillsTeach: req.body.skillsTeach
      },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
router.put("/teach/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        skillsTeach: req.body.skillsTeach
      },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

router.post("/save-skills", async (req, res) => {

  try {

    const { userId, teachSkills, learnSkills } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        teachSkills,
        learnSkills
      },
      { new: true }
    );

    res.json({
      success: true,
      user
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
module.exports = router;
