import mongoose from "mongoose"
import express from "express"
const DonorBloodDonation = new mongoose.Schema({
    bloodGroup:
    {
        type: String,
        required: true,
    }
    , Registerday:
    {
        type: String,
        required: true,
    }, Address:
    {
        type: String,
        required: true,
    },
    NearestHospital:
    {
        type: String,
        required: true,
    },
    phoneNumber:
    {
        type: Number,
        required: true

    },
    UserIdinf:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donoruser",
        required: true
    },

}, { timestamps: true })
const DonorBloodDonationexport = mongoose.model("DonorBloodDonationusers", DonorBloodDonation);
export default DonorBloodDonationexport;