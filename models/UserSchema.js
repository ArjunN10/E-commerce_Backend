const mongoose=require("mongoose")
const userschema=new mongoose.Schema({
    username:"string",
    email:"string",
    password:"string"

})

module.exports=mongoose.model("user",userschema)
