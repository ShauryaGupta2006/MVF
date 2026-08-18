const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("DataBase Connected Successfully 🛠️")
}).catch((err)=>{
    console.log("DataBase Not Connected 🔧")
})

module.exports = mongoose;
