const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log("❌ MongoDB Error:", err);
});

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// User Model
const User = mongoose.model("User", userSchema);

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 Backend Working Successfully");
});

// Signup Route
app.post("/signup", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                message: "⚠️ User already exists"
            });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            password
        });

        // Save user in database
        await newUser.save();

        res.json({
            message: "✅ User Registered Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "❌ Server Error"
        });
    }
});

// Login Route
app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                message: "❌ User Not Found"
            });
        }

        // Check password
        if (user.password !== password) {
            return res.json({
                message: "❌ Wrong Password"
            });
        }

        res.json({
            message: "✅ Login Successful",
            user
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "❌ Server Error"
        });
    }
});

// Get All Users
app.get("/users", async (req, res) => {

    try {

        const users = await User.find();

        res.json(users);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "❌ Error Fetching Users"
        });
    }
});

// Start Server
app.listen(5000, () => {
    console.log("🔥 Server Running on Port 5000");
});