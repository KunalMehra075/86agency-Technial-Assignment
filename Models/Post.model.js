const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    userID: { type: mongoose.ObjectId, ref: 'User' },
    Title: String,
    Content: String,
    createdAt: { type: Date, default: new Date().toISOString() },
    likes: [{ type: mongoose.ObjectId, ref: 'User' }],
    comments: [{
        userID: { type: mongoose.ObjectId, ref: 'User' },
        content: String,
        createdAt: { type: Date, default: new Date().toISOString() }
    }]
})
const PostModel = mongoose.model("Post", PostSchema)

module.exports = PostModel;