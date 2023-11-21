const express=require("express")
const router=express.router()
const admin=require("../controllers/Admincontroller")




const trycatch=require("../middlewares/TryCatchMiddleware")


router.use(express.json())






 module.exports=router