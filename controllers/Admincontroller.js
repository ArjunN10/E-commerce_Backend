const mongoose=require("mongoose")
const admin=require("../models/AdminSchema")
const users=require("../models/UserSchema")


mongoose.connect("mongodb://0.0.0.0:27017/user-management",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });



module.exports={

     //Admin Login

login:async (req,res)=>{
    const {email,password}=req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const Token= jwt.sign({email},process.env.ADMIN_ACCESS_TOKEN_SECRET)
        res.status(200).sent({
            status:"success",
            message:"Admin registration successful",
            data:Token
        });
    }else{
        res.ststus(404).json({
            status:"Error",
            message:"invalid Admin🛑..."
        })
    }
}




















    }
