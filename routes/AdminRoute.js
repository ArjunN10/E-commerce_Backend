const express=require("express")
const router=express.Router()
const admin=require("../controllers/Admincontroller")



//middleware
const TrycatchMiddleware = require("../middlewares/TryCatchMiddleware")
// const verifyToken=require("../middlewares/AdminAuthMiddleware")


// router.use(express.json())

router.post("/login", TrycatchMiddleware(admin.login));
// router.use(verifyToken)





 module.exports=router