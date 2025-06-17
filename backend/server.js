import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import dbConnection from "./utils/index.js"
import routes from "./routes/index.js"
dotenv.config();

dbConnection();
const port= process.env.PORT;
const app= express();

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