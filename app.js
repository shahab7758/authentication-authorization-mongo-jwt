require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const userRoutes = require("./routes/user");

const app = express();
app.use(express.json());

//using user route
app.use(userRoutes);

//logic

module.exports = app;
