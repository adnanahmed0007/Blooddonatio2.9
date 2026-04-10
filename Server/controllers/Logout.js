const Logout = async (req, res) => {
    try {

        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });

        return res.status(200).json({
            message: "Successfully logged out"
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Logout failed. Try again."
        });
    }
};

export default Logout;
