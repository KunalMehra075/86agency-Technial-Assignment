const UserRouter = require("./Routes/User.route");
const PostRouter = require("./Routes/Post.route");
const AuthRouter = require("./Routes/Auth.route");

const connection = require("./Config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


//? Middlewares------------------------------------------------->

app.use(cors())
app.use(express.json());
app.use("/users", UserRouter)
app.use("/auth", AuthRouter)
app.use("/posts", PostRouter)


//* Base Route> -------------------------------------------------->

app.get("/", (req, res) => {
    try {
        res.status(200).json({ Message: "Welcome to Social Media App" });
    } catch (err) {
        console.log(err);
        res.status(503).json({ Error: err })
    }
});

//! ------------- Error Handling Route ----------------------------->
app.use((req, res) => {
    let Method = req.method
    let URL = req.url
    res.status(404).json({ Message: "Route Not Found", Method, URL })
})


//todo<----------- LISTNING TO SERVER----------------->
app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (err) {
        console.log("Error connecting to DB");
    }
    console.log(`Server is Rocking on port ${process.env.PORT}`);
});


// Please checkout api.rest file to test all the routes!