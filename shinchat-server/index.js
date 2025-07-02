const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messagesRoute = require("./routes/messagesRoute");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors({
    origin: process.env.CLIENT_URL,  // Use specific front-end URL
    credentials: true,
}));
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoute);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});

const io = socket(server, {
    cors: {
        origin: process.env.CLIENT_URL,  // Use the same front-end URL for Socket.IO
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    console.log(`New user connected: ${socket.id}`);

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log(`User ${userId} added to online users.`);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
            console.log(`Message sent to ${data.to}`);
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        onlineUsers.delete(socket.id);
    });
});
