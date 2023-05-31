const AuthRouter = require("express").Router()
const UserModel = require("../Models/User.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");


// auth/signup
// auth/login

//! Register Route> ----------------------------------------------->
AuthRouter.post("/signup", async (req, res) => {
    let { email, password } = req.body
    let user = req.body
    try {
        const exitings = await UserModel.find({ email });
        if (exitings.length > 0) {
            res.status(200).json({ Message: "You Have Already Registered", success: false, exist: true });
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (hash) {
                    user.password = hash
                    let instance = new UserModel(user)
                    await instance.save()
                    res.status(201).json({ Message: "Registration Successful", success: true, exist: false, instance });
                } else {
                    res.status(500).json({ Message: "Error from Bcrypt", success: false, exist: false });
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: err })
    }
});
//! Login Route> ------------------------------------------------->
AuthRouter.post("/login", async (req, res) => {
    let { email, password } = req.body
    try {
        let Users = await UserModel.find({ email })
        if (Users.length == 0) {
            res.status(200).json({ Message: "You have not registered" });
        } else {
            let user = Users[0]
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    jwt.sign({ userID: user._id }, process.env.key, (err, token) => {
                        if (token) {
                            res.status(200).json({ Message: "Login Successful", token, user });
                        } else {
                            res.status(500).json({ Message: "JWT error" });
                        }
                    });
                } else {
                    res.status(400).json({ Message: "Wrong credentials" });
                }

            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: err })
    }
});

module.exports = AuthRouter;