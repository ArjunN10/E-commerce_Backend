require("dotenv").config();
const express = require("express");
const app = express();
const port = 6000;
const adminrout = require("./routes/AdminRoute");
// const usersrout = require("./routes/UserRoute");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/E-commerce_FullStack", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin",adminrout);
// app.use("/api/users", usersrout);

// Additional application logic goes here...

app.listen(port, (err) => {
  if (err) {
    console.log(`error detected ${err}`);
  }
  console.log(`server is running on port${port}`);
});
