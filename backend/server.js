const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../htmlfile")));

dotenv.config();

const app = express();

// ── Middleware ──
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../htmlfile")));
// ── MongoDB Connection ──
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ── User Schema ──
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName:  String,
  email:     { type: String, unique: true },
  password:  String,
  role:      String,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// ── Skill Schema ──
const skillSchema = new mongoose.Schema({
  title:       String,
  category:    String,
  description: String,
  tags:        [String],
  icon:        String,
  members:     { type: Number, default: 0 },
}, { timestamps: true });

const Skill = mongoose.model("Skill", skillSchema);

// ── Home Route ──
app.get("/", (req, res) => {
  res.send("🚀 Backend Working Successfully");
});

// ── Signup Route ──
app.post("/api/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirm, role } = req.body;

    if (!firstName || !email || !password)
      return res.status(400).json({ message: "All fields are required." });

    if (password !== confirm)
      return res.status(400).json({ message: "Passwords do not match." });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email already registered." });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashed, role });
    await user.save();

    res.status(201).json({ message: "Account created successfully!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ── Login Route ──
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required." });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "No account found with this email." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id:        user._id,
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email,
        role:      user.role,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ── Get All Skills ──
app.get("/api/skills", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== "All" ? { category } : {};
    const skills = await Skill.find(filter).sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ── Add Skill (Admin only) ──
app.post("/api/skills/add", async (req, res) => {
  try {
    const { adminKey, title, category, description, tags, icon } = req.body;

    if (adminKey !== process.env.ADMIN_KEY)
      return res.status(401).json({ message: "Unauthorized." });

    const skill = new Skill({ title, category, description, tags, icon });
    await skill.save();
    res.status(201).json({ message: "Skill added!", skill });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ── Delete Skill (Admin only) ──
app.delete("/api/skills/:id", async (req, res) => {
  try {
    const { adminKey } = req.body;
    if (adminKey !== process.env.ADMIN_KEY)
      return res.status(401).json({ message: "Unauthorized." });

    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill deleted." });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ── Start Server ──
app.listen(5000, () => {
  console.log("🔥 Server Running on Port 5000");
});