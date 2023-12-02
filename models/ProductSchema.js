const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({

title:String,
image:String,
price:Number,
category:String,
description:String,
 


})
module.exports=mongoose.model("products",productSchema)