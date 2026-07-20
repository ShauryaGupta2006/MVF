const app = require("./app")
require("dotenv").config()

const PORT = process.env.PORT || 4400;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});