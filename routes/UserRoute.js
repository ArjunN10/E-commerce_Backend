const express=require("express")
const router=express()
const usercontroller=require("../controllers/Usercontroller")

const TryCatchMiddleware=require("../middlewares/TryCatchMiddleware")


router
.post("/register",TryCatchMiddleware(usercontroller.UserRegister))
.post("/login",TryCatchMiddleware(usercontroller.userlogin))


module.exports=router

