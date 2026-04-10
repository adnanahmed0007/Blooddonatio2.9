import mongoose from "mongoose";
const Doneruser = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,

    },
    age:
    {
        type: Number,
        required: true,
    },

    email:
    {
        type: String,
        required: true,
        unique: true, // no duplicate emails
        lowercase: true, // always store in lowercase
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone:
    {
        type: Number,
        required: true,
        unique: true,
    },
    bloodGroup:
    {
        type: String,
        required: true,
        enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]

    },
    password:
    {
        type: String,
        required: true,
    },

}, { timestamps: true })

const DonorUserexport = mongoose.model("Donoruser", Doneruser);
export default DonorUserexport;