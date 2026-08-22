const express = require("express")
const route = express.Router()
const jwt = require("jsonwebtoken")
const User = require("../models/User.js")
const bcrypt = require("bcrypt")

route.post("/isloggedin", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({ loggedin: false });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return res.json({ loggedin: false });
        }
        return res.json({ loggedin: true });
    } catch (err) {
        return res.status(401).json({ loggedin: false, error: err.message });
    }
})

route.post("/signup", async (req, res) => {
    try {
        const { name, username, email, password, conpass } = req.body;

        if (password !== conpass) {
            return res.json({ success: false, message: "Passwords do not match" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "Email Already Registered" });
        }

        const user2 = await User.findOne({ username });
        if (user2) {
            return res.json({ success: false, message: "Username Already Taken" });
        }

        const hassedPass = await bcrypt.hash(password, 10);
        const newUser = new User({ name, username, email, password: hassedPass });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "20d", algorithm: "HS256" });

        return res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 20,
            sameSite: 'lax'
        }).status(201).json({ success: true, message: "User Registered Successfully" });
    } catch (err) { 
        return res.status(500).json({ success: false, message: err.message });
    }
})

route.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (user) {
            // Email found, checking password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "20d", algorithm: "HS256" });
                return res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 1000 * 60 * 60 * 24 * 20,
                    sameSite: 'lax'
                }).status(201).json({ success: true, message: "Login Successful" });
            } else {
                return res.status(401).json({ success: false, message: "Invalid Credentials" });
            }
        } else {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
})

module.exports = route;
