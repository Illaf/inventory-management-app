import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import dbConnection from "./utils/index.js"
import routes from "./routes/index.js"
import http from "http"
import {Server} from "socket.io"
dotenv.config();

dbConnection();
const port= process.env.PORT;
const app= express();
const server= http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
      }
})
const onlineUsers = new Map();
io.on("connection",(socket) => {
// console.log("User connected:",socket.id)

socket.on("register",({userId,role}) => {
onlineUsers.set(userId,{socketId: socket.id,role})
})

socket.on("disconnect",() => {
for(let [key,value] of onlineUsers.entries()){
    if(socket.id === value.socketId){
        onlineUsers.delete(key)
    }
}
})
})
app.use(
    cors({
        origin:["http://localhost:3000","http://localhost:4200"],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
    })
)
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use('/api',routes);
app.listen(port,()=> console.log(`Server listening on port ${port}`))
server.listen(3000,() => {
    console.log("Socket io server is listening on port 3000")
})
export {app, server, io, onlineUsers}