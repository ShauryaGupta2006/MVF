const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const authRoutes = require("./src/routes/auth.js")
const database = require("./src/config/db.js")

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl) or localhost dev servers
        if (!origin || origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1")) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth",authRoutes);

// Helper to build TMDB fetch options
const tmdbOptions = () => ({
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_HEADER_CRED}`
    }
});

app.get("/",(req,res)=>{

    // 1. Check Login
    // 2. Fetch Movies Genre wise

    const token = req.cookies.token
    if(token){
        //. User Having Login token
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                res.status(401).json({
                    success:false,
                    error:"Unauthorized"
                })
                return
            }
            req.user = decoded
        })

    }
    else{
        res.status(401).json({
            success:false,
            error:"Unauthorized"
        })
        return
    }

    res.json({
        success:true,
        message:"Backend is working"
    })
})

app.get("/trending", async (req, res) => {
    try {
        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
        const response = await fetch(url, tmdbOptions());
        const json = await response.json();
        res.json({ success: true, data: json });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get("/upcoming", async (req, res) => {
    try {
        const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
        const response = await fetch(url, tmdbOptions());
        const json = await response.json();
        res.json({ success: true, data: json });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get("/genre/:genreId", async (req, res) => {
    const { genreId } = req.params;
    try {
        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&sort_by=popularity.desc&page=1`;
        const response = await fetch(url, tmdbOptions());
        const json = await response.json();
        res.json({ success: true, data: json });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get("/search", async (req, res) => {
    const { query } = req.query;
    if (!query || !query.trim()) {
        return res.status(400).json({ success: false, error: "Search query is required." });
    }
    try {
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`;
        const response = await fetch(url, tmdbOptions());
        const json = await response.json();
        res.json({ success: true, data: json });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get("/movie/:movieId", async (req, res) => {
    const { movieId } = req.params;
    try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=credits,videos,similar`;
        // const url = `https://api.themoviedb.org/3/find/${movieId}?external_source=imdb_id&language=en-US`;
        const response = await fetch(url, tmdbOptions());
        const json = await response.json();
        res.json({ success: true, data: json });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});



module.exports = app;