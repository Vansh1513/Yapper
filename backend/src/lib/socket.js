import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// used to store online users
const userSocketMap = {}; // { userId: socketId }

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {   // ✅ pass socket here
  const userId = socket.handshake.query.userId;
  console.log("🟢 => New Connection! Socket ID:", socket.id, "Extracted UserID:", userId);

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;

    // send online users to all connected clients
    const currentOnline = Object.keys(userSocketMap);
    console.log("📤 Emitting online users to ALL:", currentOnline);
    io.emit("getOnlineUsers", currentOnline);
  } else {
    console.log("⚠️ A user connected but no valid userId was passed in query handshake.");
  }

  socket.on("typing", ({ receiverId }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", { senderId: userId });
    }
  });

  socket.on("stopTyping", ({ receiverId }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("stopTyping", { senderId: userId });
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 => Disconnected: Socket ID:", socket.id, "Associated UserID:", userId);
    if (userId) {
      delete userSocketMap[userId];
    }
    const currentOnline = Object.keys(userSocketMap);
    console.log("📤 Emitting updated online users after disconnect:", currentOnline);
    io.emit("getOnlineUsers", currentOnline);
  });
});

export { io, app, server };
