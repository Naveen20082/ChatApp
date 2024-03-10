
const express = require("express");
const path = require("path");
const app = express();

require("./db/connection");
const User = require("./Modals/User");
const { json } = require("express");

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("");
});

app.post("/registration", async (req, res) => {
    const { Name, Email, Password } = req.body;

    if (!Name || !Email || !Password) {
        return res.status(422).send({ error: "please fill all field" });
    }
    try {
        const existUser = await User.findOne({ Email: Email });
        if (existUser) {
            return res.status(422).send({ error: "email already exist" });
        } else {

            const registeruserdata = new User({ Name, Email, Password });
            console.log(registeruserdata);

            const registered = await registeruserdata.save();
            console.log(registered);
            res.status(201).send({ display: registered });
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});

app.post("/delete", async (req,res)=>{
    const { Name, Email, Password } = req.body;
    if (!Name || !Email || !Password) {
        return res.status(422).send({ error: "please fill all field" });
    }
    try {
        const existUser = await User.findOne({ Email: Email });
        if (existUser && existUser.Password===Password) {
            const response = await User.deleteOne({
                Email,
              });
            return res.status(201).send({ msg: "email deleted", User: existUser });
        } else if (!existUser) {
            res.status(404).send({ error: "NO User Found" });
        } else if (existUser.Password!==Password) {
            res.status(404).send({ error: "PassWord MisMatch" });
        }else{
            res.status(404).send({ error: "User or Password Mismatch " });
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error);
    } 
})

app.post("/socketConnection", async (req,res)=>{
    console.log("Socket Connection Request");
})

app.listen(port, () => {
    console.log(`server is running at ${port}`);
});