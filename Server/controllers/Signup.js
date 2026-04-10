import DonorUserexport from "../models/DonerRegistration.js";
import bcrypt from "bcrypt";
import Generatetoken from "../utils/Generatetoken.js";
const Signupuser = async (req, res, next) => {
    try {
        const { name, email, phone, bloodGroup, age, password } = req.body;


        if (name && email && phone && bloodGroup && age && password) {
            const findexsistinguser = await DonorUserexport.findOne(
                {
                    $or: [{ email: email }, { phone: phone }]
                })
            if (findexsistinguser) {
                return res
                    .status(401)
                    .json({
                        message: "user already regsiter"

                    })
            }
            const hashedpassword = await bcrypt.hash(password, 5);


            const newuser = new DonorUserexport({
                name: name.trim().toLowerCase(),
                email: email.trim().toLowerCase(),
                phone: phone,
                bloodGroup: bloodGroup.trim(),
                age: age,
                password: hashedpassword,


            })
            const saved = await newuser.save();
            await Generatetoken(saved._id, res);
            if (saved) {
                return res
                    .status(200)
                    .json({
                        message: "user register succefully",
                        newuser: saved,
                    })
            }




        }

    }
    catch (e) {
        console.log(e)
        return res
            .status(500)
            .json({
                message: ` error occured ${e}`,
            })
    }
}
export default Signupuser