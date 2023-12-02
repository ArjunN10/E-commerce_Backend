
// const users=require("../models/UserSchema")
const jwt=require("jsonwebtoken")
const userDatabase=require("../models/UserSchema")
const {joiProductSchema}=require("../models/ValidationSchema")
const products=require("../models/ProductSchema")
const OrderSchema = require("../models/OrderSchema")




module.exports={

     //Admin Login

     login: async (req, res) => {
        const { email, password } = req.body;
        // console.log("admin:",email,password)
        if (
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD
        ) {
          const toekn = jwt.sign(
            { email },
            process.env.ADMIN_ACCESS_TOKEN_SECRET
          );
          return res.status(200).json({
            statu: "Succes",
            message: "Admin registration succsfull",
            data: toekn,
          });
        } else {
          return res.status(404).json({
            status: "error",
            message: "Invalid Admin🛑 ",
          });
        }
      },


//List all users

allusers:async(req,res)=>{
    
    const allusers=await userDatabase.find()
// console.log(allusers);
    if(allusers.length === 0){
        res.status(404).json({
            status:"error",
            message:"No Userdata Found"
        })
    }else{

        res.status(200).json({
            status:"success",
            message:"Successfully fetched Users Data",
            data:allusers
        })
    }
},

//View specific user data


UseById:async(req,res)=>{
    const userId=req.params.id
    const user=await userDatabase.findById(userId)

    if(!user){
        res.status(404).json({
            status:"error",
            message:"User Not Found"
        })
    }
    res.status(200).json({
        status:"success",
        message:"User successfully Found",
        data:{user}
    })
},


//Add/Create a  products

addproduct:async(req,res)=>{
    console.log("hhhhh");
    const {value,error}=joiProductSchema.validate(req.body)
    if (error){
        res.status(404).json({
           error:error.details[0].message
        })
    }
    const {title,description,category,price,image}=value;
    await products.create({
        title,
        description,
        category,
        price,
        image

    })
    res.status(201).json({
        status:"success",
        message:"product created successfully",
        data:products
    })
},



//View all products

allproducts:async(req,res)=>{
const productsList= await products.find();
if(!productsList){
    res.status(404).json({
        status:"error",
        message:"Products not found"
    })
}
res.status(200).json({
    status:"success",
    message:"All product details fetched successfully",
    data:productsList
})

},


//View product By Id


productById:async(req,res)=>{
const productid=req.params.id
const product=await products.findById(productid)
    if(!product){
        res.status(404).json({
            status:"error",
            message:"Product Not Found"
        })
    }
    res.status(200).json({
        status:"success",
        message:"product details fetched successfully",
        data:product
    })

},


//Delete product

deleteProduct:async(req,res)=>{
    const {productId}=req.body


    if(!productId || !mongoose.Types.ObjectId.isValid(productId)){
        return res.status(404).json({
            status:"error",
            message:"Invalid product Id provided"
        })
    }
    const productdeleted=await products.findOneAndDelete({_id:productId})
    if(!productdeleted){
        return res.status(404).json({
            status:"error",
            message:"Product Not Found in Database"
        })
    }
    return res.status(200).json({
        status:"success",
        message:"product deleted successfully"
    })
},


//Update product

UpdateProduct:async(req,res)=>{
const {value,error}= joiProductSchema.validate(req.body)

if(error){
    return res.status(404).json({
        status:"error",
        message:error.details[0].message
    })
}
const {id,title,image,price,category,description}=value;

const product=await products.find()
if(!product){

    return res.status(404).json({
        status:"error",
        message:"Product not found in database"
    })
}
await products.findByIdAndUpdate(
    {_id:id},
    {
        title,
        image,
        price,
        category,
        description
    }
)
res.status(200).json({
    status:"success",
    message:"Product successfully Updated"
})
},


//order Details

AdminOrderDtails:async(req,res)=>{

    const products=await OrderSchema.find()
    if(products.length === 0){
        return res.status(404).json({
            status:"error",
            message:"No order Details"
        })
    }
    res.status(200).json({
        status:"success",
        message:"Order Details Successfully Fetched",
        order_Data:products 
    })
},


//Total Revenue Generated

status:async(req,res)=>{

    const totalRevenue = await OrderSchema.aggregate([ 
        {
          $group: {
            _id: null,
            totalProduct: { $sum: { $size: "$products" } },
            totalRevenue: { $sum: "$total_amount" },
          }
        }
      ])
  
      if (totalRevenue.length > 0) {
        // You have results
        res.status(200).json({ 
            status: "Success", 
            data: totalRevenue[0] })
      } else {
        // No results found
        res
          .status(200)
          .json({
            status: "Success",
            data: { totalProduct: 0, 
                totalRevenue: 0 
                }
             })
         }
    },
}

