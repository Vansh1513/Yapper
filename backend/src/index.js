import express from "express";
import dotenv from "dotenv";
dotenv.config();
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {app,server} from "./lib/socket.js";

const PORT=process.env.PORT;
app.use(express.json({limit:"10mb"}));//allows you to extract the json data out of the body.
app.use(cookieParser()); 
app.use(bodyParser.json())
//allow you to parse the cookies,so you can grab the values out of it.
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}
));

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
console.log("PORT =", process.env.PORT);

server.listen(PORT,()=>{
    console.log("Server is running on PORT: "+PORT);
    connectDB();
});