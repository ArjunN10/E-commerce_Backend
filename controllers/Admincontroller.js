require("dotenv").config();

// const users=require("../models/UserSchema")
const jwt=require("jsonwebtoken")




module.exports={

     //Admin Login

     login: async (req, res) => {
        const { email, password } = req.body;
        console.log("admin:",email,password)
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
            message: "Admin registratin succs full",
            data: toekn,
          });
        } else {
          return res.status(404).json({
            status: "error",
            message: "Thsi is no an admin🧐 ",
          });
        }
      },




















    }
