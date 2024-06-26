const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const app = express();

require("./db/connection");
const User = require("./Modals/User");
const { json } = require("express");

const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.post("/registration", async (req, res) => {
    const { Name, Email, Password } = req.body;

    if (!Name || !Email || !Password) {
        return res.status(422).send({ error: "please fill all field" });
    }
    try {
        const existUser = await User.findOne({ Email: Email });
        if (existUser) {
            return res.status(422).send({ error: "Please Login as Email Already Exist" });
        } else {

            const registeruserdata = new User({ Name, Email, Password });

            const token = await registeruserdata.produceAuthToken();

            const userData = await registeruserdata.save();
            console.log({userData ,token});
            res.status(201).send( {userData ,token} );
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
});

// // login validation
app.post("/login", async(req, res)=>{
    try {
        const Email = req.body.Email;
        const Password = req.body.Password;

        const useremail = await User.findOne({Email});

        const token = await useremail.produceAuthToken();

        const isMatch = await bcrypt.compare(Password, useremail.Password);

        if(isMatch){
            res.status(201).send({token: token});
        } else{
            res.send("data is not correct");
        }

    } catch (error) {
        console.log(error)
        res.status(400).send("invalid E-mail")
    }
})

app.post("/socketConnection", async (req,res)=>{
    console.log("Socket Connection Request");
    res.send({
        ip: "http://192.168.45.64:",
        port: "8080"
    })
});



app.listen(port, () => {
    console.log(`server is running at ${port}`);
});