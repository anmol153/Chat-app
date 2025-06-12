import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);



const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});


let userSocketMap = {}; 
export function getReceiverId(user){
    return userSocketMap[user];
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUser", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUser", Object.keys(userSocketMap));
      console.log("User is Disconnected");
    }
  });
});

export { io, server, app };
