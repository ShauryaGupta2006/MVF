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
});

route.post("/google", async (req, res) => {
    try {
        const { credential } = req.body;
        if (!credential) {
            return res.status(400).json({ success: false, message: "Google credential token is required" });
        }

        const { OAuth2Client } = require("google-auth-library");
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture } = payload;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email not provided by Google account" });
        }

        // Check if user exists with this email or googleId
        let user = await User.findOne({ $or: [{ email }, { googleId }] });

        if (!user) {
            // Generate clean unique username
            let baseUsername = (name || email.split("@")[0]).toLowerCase().replace(/[^a-z0-9]/g, "");
            let username = baseUsername;
            let counter = 1;
            while (await User.findOne({ username })) {
                username = `${baseUsername}${Math.floor(100 + Math.random() * 900)}${counter}`;
                counter++;
            }

            user = new User({
                name: name || "User",
                username: username || `user_${Date.now()}`,
                email,
                googleId,
                avatar: picture || "",
            });
            await user.save();
        } else {
            // Link googleId or update avatar if missing
            if (!user.googleId) user.googleId = googleId;
            if (!user.avatar && picture) user.avatar = picture;
            await user.save();
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "20d", algorithm: "HS256" });

        return res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 20,
            sameSite: "lax"
        }).status(200).json({
            success: true,
            message: "Google login successful",
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (err) {
        console.error("Google Auth Error:", err);
        return res.status(401).json({ success: false, message: "Google authentication failed", error: err.message });
    }
});

module.exports = route;
