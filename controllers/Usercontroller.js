const jwt=require("jsonwebtoken")
const userdatabase=require("../models/UserSchema")
const { joiUserSchema}=require("../models/ValidationSchema")
const bcrypt=require("bcrypt")
const Products=require("../models/ProductSchema")



module.exports={

//User Register

UserRegister: async (req, res) => {
    // console.log(req.body)
    const { value, error } = joiUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: "Error",
            message: "Invalid user input data. Please check the data",
        });
    }

    try {
        const { name, email, username, password } = value;
        //    console.log("the data is",value);
        await userdatabase.create({
            name,
            username,
            email,
            password,
        });

        res.status(201).json({
            status: "success",
            message: "User registration successful",
        });
    } catch (err) {
        // console.error("Error during user registration:", err);
        res.status(500).json({
            status: "Error",
            message: "Internal Server Error",
        });
    }
},



//User Login

userlogin:async(req,res)=>{
const {value,error}=joiUserSchema.validate(req.body)
if(error){
    return res.json(error.message)
}
const {email,password}=value
const user =await userdatabase.findOne({
    email:email
})



// console.log(user)

const id=user.id

if(!user){
return res.status(404).json({
    status:"errror",
    message:"User not found"
})
}

if(!password || !user.password){
    return res.status(400).json({
        status:"error",
        message:"invalid input"
    })
}
const passwordmatch=await bcrypt.compare(password,user.password)
if(!passwordmatch){
    return res.status(401).json({
        status:"error",
        message:"incorrect password"
    })
}

const Token=jwt.sign({email:user.email},process.env.USER_ACCES_TOKEN_SECRET,{
    expiresIn:8500
})
res.status(200).json({
    status:"success",
    message:"Login Successfull",
    data:{id,email,Token}
})
},


//view All product By categoury

ViewProduct:async(req,res)=>{
    const products=await Products.find()
    if(!products){
        return res.status(404).json({
            status:"error",
            message:"No products Found"
        })
    }
    return res.status(200).json({
        status:"success",
        message:"Products Fetched Successfully"
    })
},


//View a specific product

productById:async(req,res)=>{
    const productId=req.params.id
    const prdt=await Products.findById(productId)
    // console.log(prdt);
    if(!prdt){
        res.status(404).json({
            status:"error",
            message:"product not found"
        })
    }
    res.status(200).json({
        status:"success",
        message:"product fetched successfully✅",
        data:prdt
    })

},

// view product Category

productBycategory:async(req,res)=>{
const productCategory=req.params.categoryname
const Prdct=await Products.find({category:productCategory})
// console.log(Prdct)
if(!Prdct){
    return res.status(404).json({
        status:"error",
        message:"Category Not Found"
    })
}
res.status(200).json({
    status:"success",
    message:"Product Category Fetched✅",
    data:{Prdct}

})

},


// Add to Cart

addtocart:async(req,res)=>{ 
    const Userid=req.params.id 
    // console.log(Userid) 
    const user=await Products.findById(Userid)
    if(user){
        res.status(404).json({
            status:"error",
            message:"User Not Found"
        })
    } 
    const {productId}=req.body
    if(!productId){
        res.status(404).json({
            status:"error",
            message:"Product Not Found"
        })
    }
    await userdatabase.updateOne({_id:Userid},{$addToSet:{cart:productId}})
    res.status(200).json({
        status:"success",
        message:"Product Successfully Added To Cart"
    })
},

//view product from cart

ViewCart:async(req,res)=>{
    const UserId=req.params.id
    const user=await userdatabase.findById(UserId)
    // console.log(user) 
    if(!user){
        res.status(404).json({
            status:"error",
            message:"User Not Found"
        })
    } 
    const cartProductId=user.cart
    if (cartProductId.length === 0) {
        return res
          .status(200)
          .json({ status: "Succes", message: "User Cart is Emty", data: [] });
      }
      const cartProducts=await Products.find({_id:{$in:cartProductId}})
  res.status(200).json({
    status:"success",
    message:"cart Product Fetched Successfully",
    data: cartProducts
  })
},



//Add product to wishlist


AddToWishlist:async(req,res)=>{
    const userId=req.params.id
    // console.log(userId) 
    if(!userId){
        res.status(404).json({
            status:"error",
            message:"User Not Found"

        })
}
const {productId}=req.body
const prdts=await Products.findById(productId)
if(!prdts){
    return res.status(404).json({ 
    status: "Failure", 
    message: "Product not found" });
}
const findprdts=await userdatabase.findOne({_id:userId, wishlist:productId})
if (findprdts) {
    return res.status(409).json({ 
        message: "Product already on your wishlist " 
    });
  }
  await userdatabase.updateOne({_id:userId},{$push:{wishlist:prdts}})
  res.status(201).json({
    status: "Success",
    message: "Product Succesfuly added to wishList",
  })
},


//show wishlist

ViewWishlist:async(req,res)=>{
    const userId=req.params.id
    const user=await userdatabase.findById(userId)
    if(!user){
        res.status(404).json({
            status:"error",
            message:"User Not Defined"
        })
    }
    const WishListPrdtId=user.wishlist
    // console.log("WishListPrdtId:",WishListPrdtId)
    if(WishListPrdtId.length === 0){
        return res.status(200).json({ 
            status: "Succes", 
            message: "User Wishlist is Emty", 
            data: [] });
    }
    const WishListproducts=await Products.find({_id:{$in:WishListPrdtId}})
    res.status(200).json({
      status: "Success",
      message: "Wishlist products fetched successfully",
      data: WishListproducts
})
},


//delete wishlist

deletewishlist:async(req,res)=>{
    const userId=req.params.id
    console.log(userId)
    const {productId}=req.body
    if (!productId) {
        return res.status(404).json({ 
            message: "Product not Fount" 
        });
      } 
      const user=await userdatabase.findById(userId)
      if (!user) {
        return res.status(404).json({ 
            status: "Failear", message: "User Not Found"
         });
      }
      await userdatabase.updateOne({_id:userId},{$pull:{wishlist:productId}})
      res.status(200).json({
        status:"success",
        message:"successfully removed from wishlist"
    })
},

//Payment process

payment:async(req,res)=>{
    const userId=req.params.id

    const user=await userdatabase.findOne({_id:userId}).populate(cart.productId)

    if(!user){
        return res.status(404).json({
            status:"error",
            message:"User Not Found"
        })
    }
    const cartProducts=user.cart
    if(cartProducts.length === 0){
        res.status(200).json({
            status:"success",
            message:"User cart is empty",
            data:[]

        })
    }

}







}