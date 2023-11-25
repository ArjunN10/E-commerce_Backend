const jwt=require("jsonwebtoken")
const userdatabase=require("../models/UserSchema")
const { joiUserSchema}=require("../models/ValidationSchema")
const bcrypt=require("bcrypt")




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
        console.error("Error during user registration:", err);
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
















}