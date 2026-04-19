import express from "express";
import Donation from "../../controllers/Donation.js";
import Search from "../../controllers/Search.js";
import verifyJwt from "../../middleware/VerifyJwt.js";
import FindAllBlood from "../../controllers/FIndAllblood.js";
const routerDonation = express.Router();
routerDonation.post("/donation/api/register", verifyJwt, Donation);
routerDonation.post("/donation/api/get", verifyJwt, Search);
routerDonation.get("/donation/api/getall", verifyJwt, FindAllBlood)

export default routerDonation;