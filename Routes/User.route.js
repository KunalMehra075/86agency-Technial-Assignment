const Authentication = require("../Middlewares/Authentication.middleware");
const UserModel = require("../Models/User.model");


const UserRouter = require("express").Router();


// ! GET ALL USERS ROUTE
UserRouter.get("/", async (req, res) => {
    try {
        // const Users = await UserModel.find().populate({ path: "posts", select: ["userID", "Title","Content"] });
        // const Users = await UserModel.find().populate("posts someotherref");
        const Users = await UserModel.find().populate("posts");
        res.status(200).json({ Message: "Here are all the Users", Users });
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: err })
    }
});
// ! GET ALL USERS follow BY ID
UserRouter.get("/follow/:id", async (req, res) => {
    let id = req.params.id
    try {
        const User = await UserModel.findById({ _id: id });
        let follow = User.follow
        res.status(200).json({ Message: `Here are ${User.name}'s follow `, follow });
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: err })
    }
});

// ! FOLLOW A PERSON
UserRouter.post("/follow/:id", Authentication, async (req, res) => {
    let userId = req.params.id
    let selfId = req.headers.userID
    try {
        const User = await UserModel.findById({ _id: selfId });
        let AlreadyDone = false

        User.followed.forEach(elem => {
            if (elem == userId) {
                AlreadyDone = true
            }
        });
        if (AlreadyDone) {
            return res.status(401).json({ Message: `Already following the User with with ID: ${userId}`, User });
        } else {
            User.followed.push(userId)
            await UserModel.findByIdAndUpdate({ _id: selfId }, User)
            res.status(200).json({ Message: `Started following user with with ID: ${userId}`, Your_Data: User });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: err })
    }
});
// ! UNFOLLOW A PERSON
UserRouter.post("/unfollow/:id", Authentication, async (req, res) => {
    let userId = req.params.id
    let selfId = req.headers.userID
    try {
        const User = await UserModel.findById({ _id: selfId });
        let temp = User.followed.filter(item => item != userId)
        User.followed = temp
        await UserModel.findByIdAndUpdate({ _id: selfId }, User)
        res.status(200).json({ Message: `Not Following the user with ID : ${userId}`, User });
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: err })
    }
});


module.exports = UserRouter;