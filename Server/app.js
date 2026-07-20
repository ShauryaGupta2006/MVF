const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { model } = require("mongoose")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



app.get("/trending", async (req, res) => {
    try {
        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.API_HEADER_CRED}`
            }
        };

        const response = await fetch(url, options);
        const json = await response.json();
        res.json({ success: true, data: json });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

app.get("/test", async (req, res) => {
    try {

        const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.API_HEADER_CRED}`
            }
        };

        const response = await fetch(url, options);
        const json = await response.json();
        res.json({ success: true, data: json });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
})

module.exports = app;