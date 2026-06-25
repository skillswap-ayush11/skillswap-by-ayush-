const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/matches/:userId", async (req, res) => {

  const currentUser =
    await User.findById(req.params.userId);

  const users = await User.find({
    _id: { $ne: currentUser._id }
  });

  const matches = [];

  users.forEach(user => {

    const canTeachMe =
      user.teachSkills.some(skill =>
        currentUser.learnSkills.includes(skill)
      );

    const wantLearnFromMe =
      user.learnSkills.some(skill =>
        currentUser.teachSkills.includes(skill)
      );

    if (canTeachMe && wantLearnFromMe) {
      matches.push(user);
    }

  });

  res.json(matches);
});

module.exports = router;