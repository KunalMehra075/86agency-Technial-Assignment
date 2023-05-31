const jwt = require("jsonwebtoken")
require("dotenv").config();

const Authentication = (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ Message: "Unauthorized" })
    }
    jwt.verify(token, process.env.key, (err, decoded) => {
        if (decoded) {
            req.headers.userID = decoded.userID
            next()
        } else {
            return res.status(200).json({ Message: "Please login again, jwt error" });
        }
    })
}
module.exports = Authentication;