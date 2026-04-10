import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import router from "./routes/Authentication/Authe.js";
import routerDonation from "./routes/Service/DonationRoutes.js";
import cookieParser from "cookie-parser";
const app = express();

const PORT = process.env.PORT || 9090;
const DB_URL = process.env.DB_URL;

app.set("trust proxy", 1);
app.use(
  cors({
    origin: ["http://localhost:5173",
      "https://blooddonation2-0.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser())
app.use("/auth/api", router);
app.use("/auth/dontaion/api", routerDonation)

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Connected to MongoDB & running on port ${PORT}and ${DB_URL}`);
    });
  })
  .catch((e) => {
    console.log("❌ MongoDB connection error:", e);
  });


