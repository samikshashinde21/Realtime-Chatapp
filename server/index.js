//setup the server
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");

const app = express();
require("dotenv").config();

//middleware
app.use(cors());

app.use(express.json());

app.use("/api/auth", userRoutes)

//promise
mongoose
.connect(process.env.MONGO_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
.then(() => {
    console.log("DB connection successfull");
})
.catch((err) => {
    console.log(err.message);
});

//start the server
const server = app.listen(process.env.PORT , () => 
        console.log(`Server Started on ${process.env.PORT}`)
);
