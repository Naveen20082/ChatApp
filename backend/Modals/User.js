const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Messages :{
        type: Array,
        required:false
    }
   
    // tokens:[{
    //     token:{
    //         type:String,
    //         required:true
    //     }
    // }]

})
//token generation
UserSchema.methods.produceAuthToken = async function(){
    try {
        //JWT 1. Payloads 2. SecretKey
        const token = jwt.sign({_id:this._id.toString()}, process.env.UNREVEALED_KEY, {
            expiresIn: '3d'
        } );
        console.log(token)
        await this.save();
        return token;  
    } catch (error) {
        console.log(error)
        // res.send(`the error is : ${error}`);
    }
}

UserSchema.pre("save", async function(next){
    if(this.isModified("Password")){
        this.Password = await bcrypt.hash(this.Password, 10);

        // this.Confirm_Password = await bcrypt.hash(this.Confirm_Password, 10);
    }
    next();
})

//  creating a collection

const User = new mongoose.model("User", UserSchema);
module.exports = User;