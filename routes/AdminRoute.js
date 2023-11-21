const express=require("express")
const router=express.router()





const trycatch=require("../middlewares/TryCatchMiddleware")


router.use(express.json())

//register(post)

 router.post("/register",trycatch())




 module.exports=router