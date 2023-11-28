const express=require("express")
const router=express()
const usercontroller=require("../controllers/Usercontroller")

const TryCatchMiddleware=require("../middlewares/TryCatchMiddleware")
const userVerifytoken=require("../middlewares/UserAuthMiddleware")
const TrycatchMiddleware = require("../middlewares/TryCatchMiddleware")

router
.post("/register",TryCatchMiddleware(usercontroller.UserRegister))
.post("/login",TryCatchMiddleware(usercontroller.userlogin))

.use(userVerifytoken)

.get("/products",TrycatchMiddleware(usercontroller.ViewProduct))
.get("/products/:id",TrycatchMiddleware(usercontroller.productById))
.get("/products/category/:categoryname",TryCatchMiddleware(usercontroller.productBycategory))
.post("/:id/cart",TryCatchMiddleware(usercontroller.addtocart))
.get("/:id/cart",TryCatchMiddleware(usercontroller.ViewCart))
.post("/:id/wishlists",TryCatchMiddleware(usercontroller.AddToWishlist))
.get("/:id/wishlists",TryCatchMiddleware(usercontroller.ViewWishlist))
.delete("/:id/wishlists",TryCatchMiddleware(usercontroller.deletewishlist)) 





module.exports=router

