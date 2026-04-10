import express from "express";
import Donation from "../../controllers/Donation.js";
import Search from "../../controllers/Search.js";
import verifyJwt from "../../middleware/VerifyJwt.js";

const routerDonation = express.Router();
routerDonation.post("/donation/api/register", verifyJwt, Donation);
routerDonation.post("/donation/api/get", verifyJwt, Search);

export default routerDonation;