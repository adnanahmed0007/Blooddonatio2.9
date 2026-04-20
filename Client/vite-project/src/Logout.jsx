import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, CheckCircle, AlertCircle } from "lucide-react";

const Logout = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setLoading(true);

            const res = await axios.get(`https://blooddonatio2-9.onrender.com/auth/api/logout`, {
                withCredentials: true,
            });

            if (res.status === 200) {
                setIsError(false);
                setMessage("You are successfully logged out");
                setTimeout(() => navigate("/"), 1000);
            }

        } catch (error) {
            console.error(error);
            setIsError(true);
            setMessage("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] bg-gradient-to-br from-rose-50 via-white to-red-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl shadow-red-100/50 p-10 text-center space-y-6 border border-red-50">

                    {/* Icon */}
                    <div className="flex justify-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-rose-100 rounded-full flex items-center justify-center shadow-inner">
                            <LogOut className="w-9 h-9 text-red-600" />
                        </div>
                    </div>

                    {/* Text */}
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-gray-900">
                            Leaving so{" "}
                            <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                                soon?
                            </span>
                        </h2>
                        <p className="text-gray-500 text-sm">
                            You'll need to log back in to access your account.
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="group relative w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-red-200 hover:shadow-xl hover:shadow-red-300 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <span className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                        {loading ? (
                            <>
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                <span>Logging out...</span>
                            </>
                        ) : (
                            <>
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </>
                        )}
                    </button>

                    {/* Message */}
                    {message && (
                        <div className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold ${isError
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-green-50 text-green-700 border border-green-200"
                            }`}>
                            {isError
                                ? <AlertCircle className="w-4 h-4 shrink-0" />
                                : <CheckCircle className="w-4 h-4 shrink-0" />
                            }
                            <span>{message}</span>
                        </div>
                    )}

                    {/* Back link */}
                    <Link
                        to="/"
                        className="inline-block text-sm text-gray-400 hover:text-red-600 font-medium transition-colors duration-200"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Logout;