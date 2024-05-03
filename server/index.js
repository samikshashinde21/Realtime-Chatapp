//setup the server
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
const messageRoute = require("./routes/messagesRoute");

const app = express();

const socket = require("socket.io");
require("dotenv").config();

//middleware
app.use(cors());

app.use(express.json());

app.use("/api/auth", userRoutes)

app.use("/api/messages" , messageRoute)

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

const io = socket(server, {
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    },
});

//will store all online users in this map
global.onlineUsers = new Map();

//once we have a conn, we will save chat sockett inside the global chat sockets 
//whenever we emit user from frontend and whereever user is loggedin, we will establish a socket conn by add-user
//we will grab the userid and current socketid and set it inside the map
io.on("connection" , (socket) => {
    global.chatSocket = socket;
    socket.on("add-user" , (userId) => {
        onlineUsers.set(userId, socket.id);
    });

//whenever send-msg socket event emitted, we pass the data
//data would have to and msg, 
//if msg that has to pass is online, onlineUsers would check it if it is online then we will emit the msg to that user by msg-receive event

//if the user won't be online, it would be stored in db
//and if user is online, he would receive msg at that moment only

socket.on("send-msg" , (data) => {
    const sendUserSocket = onlineUser.get(data.to);
    if(sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-receive" , data.message);
    }
})
});