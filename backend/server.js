import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import dbConnection from "./utils/index.js"
import routes from "./routes/index.js"
import http from "http"
import { initSocket } from "./utils/socket.js";
dotenv.config();

dbConnection();

const app = express();
const server = http.createServer(app);

initSocket(server);

// 🧩 MIDDLEWARE
app.use(
  cors({
    origin: ["http://localhost:4200"],
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 🚀 ROUTES
app.use("/api", routes);

// 🔥 ONE LISTEN ONLY
const PORT = process.env.PORT || 8800;
server.listen(PORT, () => {
  console.log(`Server + Socket running on port ${PORT}`);
});