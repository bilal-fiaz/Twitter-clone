// package imports
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Routes imports
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"

// Utils imports
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config()
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // to parse incoming JSON data or req.body
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded data from forms
app.use(cookieParser()); // to parse cookies from incoming requests

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

console.log(process.env.MONGO_URI)

app.listen(PORT , ()=>{
    console.log(`server is runing on the port ${PORT}`);
    connectMongoDB();
})
