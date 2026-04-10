import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Logout = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setLoading(true);

            const res = await axios.get("http://localhost:9090/auth/api/logout", {
                withCredentials: true,
            });

            if (res.status === 200) {
                setMessage(" Your are successfully logout");
                setTimeout(() => navigate("/"), 1000);
            }



        } catch (error) {
            console.error(error);
            setMessage("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">Logout</h2>

                <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition disabled:opacity-50"
                >
                    {loading ? "Logging out..." : "Logout"}
                </button>

                {message && (
                    <p className="mt-4 text-gray-700">{message}</p>
                )}
            </div>
        </div>
    );
};

export default Logout;
