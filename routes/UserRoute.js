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
.post("/:id/cart",TryCatchMiddleware(usercontroller.addToCart))
.get("/:id/cart",TryCatchMiddleware(usercontroller.ViewCart))
.post("/:id/wishlists",TryCatchMiddleware(usercontroller.AddToWishlist))
.get("/:id/wishlists",TryCatchMiddleware(usercontroller.ViewWishlist))
.delete("/:id/wishlists",TryCatchMiddleware(usercontroller.deletewishlist)) 
.post("/:id/payment",TryCatchMiddleware(usercontroller.payment))
.get("/payment/success",TryCatchMiddleware(usercontroller.success))
.post("/payment/cancel",TryCatchMiddleware(usercontroller.Cancel)) 
.get("/:id/orders",TryCatchMiddleware(usercontroller.OrederDetails))

    



module.exports=router

