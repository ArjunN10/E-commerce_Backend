const mongoose=require("mongoose")
const adminschema=new mongoose.Schema({
    username:"string",
    email:"string",
    password:"string"

})

module.exports=mongoose.model("admin",adminschema)