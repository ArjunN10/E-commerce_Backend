const express=require("express");
const app=express()
const port=8000;
const adminrout=require("./routes/AdminRoute")


app.use(express.json())
app.use("/",adminrout)

app.listen(port,(err)=>{
    if(err){
        console.log(`error detected ${err}`);
    }
    console.log(`server is running on port${port}`);
})