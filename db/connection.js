const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://CHATAPP:CHATAPP@chatapp.0aljpkp.mongodb.net/').then(()=>{
    console.log("connected to Moonsgose");
}).catch((e)=>{
    console.log(e);
}) 