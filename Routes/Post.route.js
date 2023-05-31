const Authentication = require("../Middlewares/Authentication.middleware");
const PostModel = require("../Models/Post.model");
const UserModel = require("../Models/User.model");
const PostRouter = require("express").Router();





// ! GET ALL POSTS
PostRouter.get("/", async (req, res) => {
    try {
        let Posts = await PostModel.find()
        res.status(200).json({ Message: "Here are all the posts", Posts });
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: err })
    }
});
// ! GET A POST BY ID
PostRouter.get("/:id", async (req, res) => {
    let id = req.params.id
    try {
        let Post = await PostModel.findById({ _id: id })
        res.status(200).json({ Message: "Get Post by Id", Post });
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: err })
    }
});
// ! POST A NEW POST
PostRouter.post("/", Authentication, async (req, res) => {
    let post = req.body
    let AuthID = req.headers.userID
    post.userID = AuthID
    try {
        let Post = await PostModel.create(post)
        let User = await UserModel.findById({ _id: AuthID })
        User.posts.push(Post._id)
        await UserModel.findByIdAndUpdate({ _id: AuthID }, User)
        res.status(200).json({ Message: "New Post Created", Post, User: User._id });
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: err })
    }
});
// ! UPDATE AND EXISTING POST
PostRouter.put("/:id", Authentication, async (req, res) => {
    let AuthID = req.headers.userID
    let PostID = req.params.id
    let payload = req.body
    try {
        let Post = await PostModel.findById({ _id: PostID })
        let Creator = Post.userID
        if (Creator != AuthID) {
            return res.status(401).json({ Message: "Un-authorized, Cannot update Other people Posts", YourID: AuthID, Creator });
        } else {
            let Updated = await PostModel.findByIdAndUpdate({ _id: PostID }, payload)
            res.status(200).json({ Message: "Post Updated Successfully", Updated });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: err })
    }
});
// ! DELETE A POST
PostRouter.delete("/:id", Authentication, async (req, res) => {
    let AuthID = req.headers.userID
    let PostID = req.params.id
    try {
        let Post = await PostModel.findById({ _id: PostID })
        if (!Post) {
            return res.status(404).json({ Message: "No Post found with id:" + " " + PostID });
        }
        let CreatorID = Post.userID
        if (CreatorID != AuthID) {

            return res.status(401).json({ Message: "Un-authorized, Cannot Delete Other people Posts", CreatorID, AuthID });
        } else {
            let Creator = await UserModel.findById({ _id: AuthID })
            let CreatorPosts = Creator.posts
            CreatorPosts = CreatorPosts.filter((item) => item != PostID)
            Creator.posts = CreatorPosts
            await UserModel.findByIdAndUpdate({ _id: CreatorID }, Creator)
            let Deleted = await PostModel.findByIdAndDelete({ _id: PostID })
            res.status(200).json({ Message: `Post with Id: ${PostID} Deleted Successfully`, Deleted });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: err })
    }
});
// ! LIKE A POST
PostRouter.post("/like/:id", Authentication, async (req, res) => {
    let id = req.params.id
    let userID = req.headers.userID
    try {
        let Post = await PostModel.findById({ _id: id })
        if (!Post) {
            return res.status(404).json({ Message: "Post not found" });
        }
        if (Post.likes.includes(userID)) {
            return res.status(201).json({ Message: "Already liked this post" });
        }
        Post.likes.push(userID)
        let NewLike = await PostModel.findByIdAndUpdate({ _id: id }, Post)
        res.status(200).json({ Message: "Liked the Post", NewLike });
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: err })
    }
});
// ! COMMENT ON A POST
PostRouter.post("/comment/:id", Authentication, async (req, res) => {
    let id = req.params.id
    let comment = req.body
    comment.userID = req.headers.userID
    try {
        let Post = await PostModel.findById({ _id: id })
        if (!Post) {
            return res.status(404).json({ Message: "Post not found" });
        }
        Post.comments.push(comment)
        let NewComment = await PostModel.findByIdAndUpdate({ _id: id }, Post)
        res.status(200).json({ Message: "Commented on a Post", NewComment });
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: err })
    }
});

module.exports = PostRouter;