import express from "express";
import Signupuser from "../../controllers/Signup.js";
import Login from "../../controllers/Login.js";
import Logout from "../../controllers/Logout.js";
import verifyJwt from "../../middleware/VerifyJwt.js";

const router = express.Router();
router.post("/signup", Signupuser);

router.post("/login", Login)
router.get("/logout", verifyJwt, Logout)


export default router;
