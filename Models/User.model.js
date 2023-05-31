const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    posts: [{ type: mongoose.ObjectId, ref: 'Post' }],
    followed: [{ type: mongoose.ObjectId, ref: 'User' }],
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel;