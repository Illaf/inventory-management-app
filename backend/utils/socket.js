import { Server } from "socket.io";

let io;
const onlineUsers = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("register", ({ userId, role }) => {
      onlineUsers.set(userId.toString(), {
        socketId: socket.id,
        role,
      });
    });

    socket.on("disconnect", () => {
      for (const [key, value] of onlineUsers.entries()) {
        if (value.socketId === socket.id) {
          onlineUsers.delete(key);
        }
      }
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

export const getOnlineUsers = () => onlineUsers;
