import express from "express";
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config()
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // to parse incoming JSON data or req.body

app.use("/api/auth", authRoutes);

console.log(process.env.MONGO_URI)

app.listen(PORT , ()=>{
    console.log(`server is runing on the port ${PORT}`);
    connectMongoDB();
})
