const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("DataBase Connected Successfully 🛠️")
}).catch((err)=>{
    console.error("DataBase Not Connected 🔧 Reason:", err.message);
})

module.exports = mongoose;
