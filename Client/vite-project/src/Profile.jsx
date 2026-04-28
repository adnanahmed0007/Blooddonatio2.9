import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    User, Mail, Phone, Droplet, Calendar, Heart, Shield,
    Edit3, LogOut, Award, Clock, Activity, ChevronRight,
    CheckCircle, AlertCircle, Loader
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./Context1";

const BLOOD_COLORS = {
    "A+": "from-red-500 to-rose-600",
    "A-": "from-red-600 to-red-700",
    "B+": "from-orange-500 to-red-500",
    "B-": "from-orange-600 to-red-600",
    "O+": "from-rose-500 to-pink-600",
    "O-": "from-rose-600 to-pink-700",
    "AB+": "from-purple-500 to-red-500",
    "AB-": "from-purple-600 to-red-600",
};

const StatCard = ({ icon: Icon, label, value, accent }) => (
    <div className="relative group bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${accent} opacity-10 rounded-bl-full`} />
        <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${accent} mb-3 shadow`}>
            <Icon className="w-4 h-4 text-white" />
        </div>
        <p className="text-2xl font-black text-gray-900">{value}</p>
        <p className="text-xs font-semibold text-gray-500 mt-0.5 uppercase tracking-wide">{label}</p>
    </div>
);

const InfoRow = ({ icon: Icon, label, value, accent = "text-red-500" }) => (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0 group">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">
            <Icon className={`w-4.5 h-4.5 ${accent} w-5 h-5`} />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
            <p className="text-sm font-semibold text-gray-800 mt-0.5 truncate">{value || "—"}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" />
    </div>
);

const Profile = () => {
    const { setUser } = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(
                    "https://blooddonatio2-9.onrender.com/auth/api/profile",
                    { withCredentials: true }
                );
                setProfile(res.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load profile. Please log in again.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post("https://blooddonatio2-9.onrender.com/auth/api/logout", {}, { withCredentials: true });
        } catch (_) { }
        setUser(false);
        navigate("/login");
    };

    const isAdmin = profile?.role === "admin";
    const bloodGradient = BLOOD_COLORS[profile?.bloodGroup] || "from-red-500 to-rose-600";

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50">
                <div className="text-center space-y-4">
                    <div className="relative w-16 h-16 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-red-100"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin"></div>
                        <Heart className="absolute inset-0 m-auto w-6 h-6 text-red-500 fill-current" />
                    </div>
                    <p className="text-gray-500 font-medium">Loading your profile…</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50 px-4">
                <div className="text-center max-w-sm bg-white rounded-3xl shadow-xl p-10 border border-red-100">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-black text-gray-900 mb-2">Oops!</h2>
                    <p className="text-gray-500 text-sm mb-6">{error}</p>
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 px-4 py-10">

            {/* Ambient background blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative max-w-2xl mx-auto space-y-6">

                {/* ── Hero Card ── */}
                <div className={`relative bg-gradient-to-br ${isAdmin ? "from-purple-600 to-indigo-700" : "from-red-600 to-rose-700"} rounded-3xl shadow-2xl overflow-hidden`}>
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 right-4 w-40 h-40 rounded-full border-4 border-white"></div>
                        <div className="absolute top-10 right-10 w-24 h-24 rounded-full border-4 border-white"></div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border-4 border-white"></div>
                    </div>

                    <div className="relative p-8">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30">
                                        {isAdmin
                                            ? <Shield className="w-10 h-10 text-white" />
                                            : <span className="text-3xl font-black text-white">
                                                {profile?.name?.charAt(0)?.toUpperCase() || "?"}
                                            </span>
                                        }
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-400 border-2 border-white shadow flex items-center justify-center">
                                        <CheckCircle className="w-3 h-3 text-white fill-current" />
                                    </div>
                                </div>

                                <div>
                                    <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                                        {isAdmin ? "Administrator" : "Blood Donor"}
                                    </p>
                                    <h1 className="text-2xl font-black text-white leading-tight">{profile?.name}</h1>
                                    <p className="text-white/70 text-sm mt-0.5">{profile?.email}</p>
                                </div>
                            </div>

                            {/* Blood Group Badge */}
                            {profile?.bloodGroup && (
                                <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/30">
                                    <Droplet className="w-5 h-5 text-white fill-current mx-auto mb-1" />
                                    <p className="text-xl font-black text-white leading-none">{profile.bloodGroup}</p>
                                    <p className="text-white/60 text-xs mt-0.5">Blood</p>
                                </div>
                            )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate("/edit-profile")}
                                className="flex-1 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-2.5 rounded-xl font-semibold text-sm transition-all border border-white/20"
                            >
                                <Edit3 className="w-4 h-4" /> Edit Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white py-2.5 px-4 rounded-xl font-semibold text-sm transition-all border border-white/20"
                            >
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Stats Row ── */}
                {!isAdmin && (
                    <div className="grid grid-cols-3 gap-4">
                        <StatCard icon={Heart} label="Donations" value={profile?.donationCount ?? 0} accent="from-red-500 to-rose-600" />
                        <StatCard icon={Award} label="Lives Saved" value={profile?.donationCount ? profile.donationCount * 3 : 0} accent="from-orange-500 to-red-500" />
                        <StatCard icon={Activity} label="Status" value="Active" accent="from-green-500 to-emerald-600" />
                    </div>
                )}

                {/* ── Info Card ── */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-black text-gray-900 text-lg">Personal Information</h2>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${isAdmin ? "bg-purple-50 text-purple-600" : "bg-red-50 text-red-600"}`}>
                            {isAdmin ? "Admin" : "Donor"}
                        </span>
                    </div>

                    <div className="px-6">
                        <InfoRow icon={User} label="Full Name" value={profile?.name} />
                        <InfoRow icon={Mail} label="Email Address" value={profile?.email} />
                        <InfoRow icon={Phone} label="Phone Number" value={profile?.phone} />
                        {profile?.bloodGroup && (
                            <InfoRow icon={Droplet} label="Blood Group" value={profile?.bloodGroup} accent="text-red-500" />
                        )}
                        {profile?.age && (
                            <InfoRow icon={Calendar} label="Age" value={`${profile?.age} years`} />
                        )}
                        <InfoRow icon={Clock} label="Member Since" value={
                            profile?.createdAt
                                ? new Date(profile.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })
                                : "—"
                        } />
                    </div>
                </div>

                {/* ── Donor CTA (only for donors) ── */}
                {!isAdmin && (
                    <div className="relative bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl p-6 shadow-xl overflow-hidden">
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
                            <Heart className="w-28 h-28 text-white fill-current" />
                        </div>
                        <div className="relative">
                            <h3 className="text-white font-black text-lg mb-1">Ready to Donate Again?</h3>
                            <p className="text-white/70 text-sm mb-4">You can donate blood every 3 months. Every drop counts.</p>
                            <button
                                onClick={() => navigate("/donate")}
                                className="bg-white text-red-600 font-bold text-sm py-2.5 px-5 rounded-xl shadow hover:shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-2"
                            >
                                <Heart className="w-4 h-4 fill-current" /> Schedule Donation
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer note */}
                <p className="text-center text-xs text-gray-400 pb-4">
                    BloodConnect — Saving lives, one drop at a time ❤️
                </p>
            </div>

            <style >{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
        </div>
    );
};

export default Profile;
