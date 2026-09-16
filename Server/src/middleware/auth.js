const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
async function CheckAuth(){

    try{

        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ success: "failure", message: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            return res.status(401).json({ success: "failure", message: "Unauthorized" });
        }

        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(401).json({ success: "failure", message: "Unauthorized" });
        }

        req.user = user;
        next();

    }catch (err){
        console.error("Error in auth middleware:", err);
        return res.status(500).json({ success: "failure", message: "Internal server error", error: err.message });
    }
    
}