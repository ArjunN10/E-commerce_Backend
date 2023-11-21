require("dotenv").config();
const express=require("express");
const app=express()
const port=6000;
const adminrout=require("./routes/AdminRoute")
const usersrout=require("./routes/UserRoute")
const cors=require("cors");
const { default: mongoose } = require("mongoose");



mongoose.connect("mongodb://localhost:27017/E-commerce_FullStack",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})



app.use(cors())
app.use("/api/admin",adminrout)
app.use("/api/users",usersrout)



app.use(express.json())
// app.use("/",adminrout)



app.listen(port,(err)=>{
    if(err){
        console.log(`error detected ${err}`);
    }
    console.log(`server is running on port${port}`);
})