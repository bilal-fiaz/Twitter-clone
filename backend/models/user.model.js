import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true,
        minLength: 6,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    followers : [
        {
            type: mongoose.Schema.Types.ObjectId, // Assuming followers are stored as references to other User documents
            ref: "User",
            default: [] // Initialize with an empty array
        }
    ],
    following : [
        {
            type: mongoose.Schema.Types.ObjectId, // Assuming following are stored as references to other User documents
            ref: "User",
            default: [] // Initialize with an empty array
        }
    ],
    profilePicture: {
        type: String,
        default: "" // You can set a default profile picture URL or leave it empty
    },
    coverPicture: {
        type: String,
        default: "" // You can set a default cover picture URL or leave it empty
    },
    bio: {
        type: String,
        default: "" // You can set a default bio or leave it empty
    },
    link: {
        type: String,
        default: "" // You can set a default link or leave it empty
    }
}, {timestamps:true})


const User = mongoose.model("User", userSchema); // Create a Mongoose model named "User" based on the defined schema

export default User;