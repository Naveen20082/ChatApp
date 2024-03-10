const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schema({
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
   
    // tokens:[{
    //     token:{
    //         type:String,
    //         required:true
    //     }
    // }]

})
//token generation
// employeeSchema.methods.produceAuthToken = async function(){
//     try {
//         const token = jwt.sign({_id:this._id}, process.env.UNREVEALED_KEY );
//         this.tokens = this.tokens.concat({token:token});
//         await this.save();
//         return token;  
//     } catch (error) {
//         res.send(`the error is : ${error}`);
//     }
// }

// employeeSchema.pre("save", async function(next){
//     // if(this.isModified("Password")){
//     //      this.Password = await bcrypt.hash(this.Password, 10);

//     //     this.Confirm_Password = await bcrypt.hash(this.Confirm_Password, 10);
//     // }
//     next();
// })

//  creating a collection

const User = new mongoose.model("User", employeeSchema);
module.exports = User;