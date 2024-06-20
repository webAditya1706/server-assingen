const express = require("express");
require("dotenv").config();
const userRoute = require("./routes/userRoutes")
const connectDb = require("./connection/dbconnection")
const app = express();

var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/user",userRoute)

app.listen(5000,() =>console.log("5000 port is wiorking"))