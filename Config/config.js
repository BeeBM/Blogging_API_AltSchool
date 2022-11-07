require("dotenv").config()


module.exports = {
    PORT: process.env.PORT || 3335,
    MONGODB_URL: process.env.MONGODB_URL,
}