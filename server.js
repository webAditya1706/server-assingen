const express = require("express");
require("dotenv").config();
const userRoute = require("./routes/userRoutes")
const productRoute = require("./routes/productRoutes")
const connectDb = require("./connection/dbconnection")
const app = express();
// const bodyParser = require('body-parser');

var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}))

// app.use(bodyParser.urlencoded({
// 	extended: false
//  }));
 
//  app.use(bodyParser.json());

app.use("/user",userRoute)
app.use("/product",productRoute)

app.listen(5000,() =>console.log("5000 port is wiorking"))