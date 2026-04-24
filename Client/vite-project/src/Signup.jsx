import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, Droplet, Calendar, Lock, Eye, EyeOff, Heart, UserPlus, Shield, KeyRound } from "lucide-react";

// ⚠️ Admin secret key — must match the one in Admin.jsx
const ADMIN_SECRET = "adnanahme12351";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodGroup: "",
    age: "",
    password: "",
    role: "donor",
  });
  const [adminKey, setAdminKey] = useState("");
  const [showAdminKey, setShowAdminKey] = useState(false);
  const [adminKeyError, setAdminKeyError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ── Admin key check ──────────────────────────────
    if (formData.role === "admin") {
      if (adminKey !== ADMIN_SECRET) {
        setAdminKeyError("Incorrect admin secret key. Access denied.");
        return;
      }
      setAdminKeyError("");
    }

    setLoading(true);
    setMessage("All data looks good! ");

    try {
      const res = await axios.post(
        `https://blooddonatio2-9.onrender.com/auth/api/signup`,
        formData,
        { withCredentials: true }
      );
      console.log(res);
      setLoading(false);

      setTimeout(() => {
        if (formData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/", { state: { email: formData.email } });
        }
      }, 2000);
    } catch (error) {
      setLoading(false);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const isAdmin = formData.role === "admin";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-red-50 px-4 py-12">

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-2xl">

        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${isAdmin ? "from-purple-600 to-indigo-600" : "from-red-600 to-rose-600"} rounded-2xl shadow-xl mb-4 transition-all duration-500`}>
            {isAdmin
              ? <Shield className="w-8 h-8 text-white" />
              : <Heart className="w-8 h-8 text-white fill-current" />
            }
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            {isAdmin ? "Create Admin Account" : "Join BloodConnect"}
          </h1>
          <p className="text-lg text-gray-600">
            {isAdmin
              ? <>Admins manage donors, requests, and platform data.<br /><span className="font-semibold text-purple-600">Full access. Full responsibility.</span></>
              : <>Your small step today can save a life tomorrow.<br /><span className="font-semibold text-red-600">Be a hero. Become a donor.</span></>
            }
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200">

          {/* ─── Role Toggle ─── */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
            <button
              type="button"
              onClick={() => { setFormData({ ...formData, role: "donor" }); setAdminKey(""); setAdminKeyError(""); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300
                ${!isAdmin ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md" : "text-gray-500 hover:text-gray-700"}`}
            >
              <Heart className={`w-4 h-4 ${!isAdmin ? "fill-current" : ""}`} />
              Sign up as Donor
            </button>
            <button
              type="button"
              onClick={() => { setFormData({ ...formData, role: "admin" }); setAdminKey(""); setAdminKeyError(""); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300
                ${isAdmin ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md" : "text-gray-500 hover:text-gray-700"}`}
            >
              <Shield className="w-4 h-4" />
              Sign up as Admin
            </button>
          </div>

          {/* Admin Notice + Secret Key */}
          {isAdmin && (
            <div className="mb-6 space-y-3">
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl flex items-start gap-3">
                <Shield className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-purple-800 text-sm">Admin Account</p>
                  <p className="text-xs text-purple-600 mt-0.5">
                    This account will have full access to manage all donors, view reports, and moderate blood requests. Blood group and age are optional for admins.
                  </p>
                </div>
              </div>

              {/* Admin Secret Key Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-purple-600" />
                  Admin Secret Key <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showAdminKey ? "text" : "password"}
                    value={adminKey}
                    onChange={(e) => { setAdminKey(e.target.value); setAdminKeyError(""); }}
                    className={`w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all
                      ${adminKeyError ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                    placeholder="Enter admin secret key..."
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminKey(!showAdminKey)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showAdminKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {adminKeyError && (
                  <p className="text-xs font-semibold text-red-600 flex items-center gap-1 mt-1">
                    <span>⛔</span> {adminKeyError}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Benefits Banner (Donor only) */}
          {!isAdmin && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Heart, text: "Save Lives" },
                { icon: Shield, text: "Safe & Secure" },
                { icon: UserPlus, text: "Join 8,500+ Donors" }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-red-50 rounded-xl">
                    <Icon className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-semibold text-gray-700">{item.text}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Message Display */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl border ${loading
              ? "bg-blue-50 border-blue-200 text-blue-700"
              : message.includes("wrong")
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-green-50 border-green-200 text-green-700"
              }`}>
              <p className="font-medium text-center">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 ${isAdmin ? "focus:ring-purple-500" : "focus:ring-red-500"} focus:border-transparent transition-all`}
                    placeholder="John Doe" required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email" id="email" name="email"
                    value={formData.email} onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 ${isAdmin ? "focus:ring-purple-500" : "focus:ring-red-500"} focus:border-transparent transition-all`}
                    placeholder="you@example.com" required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number" id="phone" name="phone"
                    value={formData.phone} onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 ${isAdmin ? "focus:ring-purple-500" : "focus:ring-red-500"} focus:border-transparent transition-all`}
                    placeholder="1234567890" required
                  />
                </div>
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <label htmlFor="bloodGroup" className="block text-sm font-semibold text-gray-700">
                  Blood Group {isAdmin && <span className="text-gray-400 font-normal">(optional)</span>}
                </label>
                <div className="relative">
                  <Droplet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    id="bloodGroup" name="bloodGroup"
                    value={formData.bloodGroup} onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 ${isAdmin ? "focus:ring-purple-500" : "focus:ring-red-500"} focus:border-transparent transition-all appearance-none cursor-pointer`}
                    required={!isAdmin}
                  >
                    <option value="">Select Blood Group</option>
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label htmlFor="age" className="block text-sm font-semibold text-gray-700">
                  Age {isAdmin && <span className="text-gray-400 font-normal">(optional)</span>}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number" id="age" name="age"
                    value={formData.age} onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 ${isAdmin ? "focus:ring-purple-500" : "focus:ring-red-500"} focus:border-transparent transition-all`}
                    placeholder="25" min="18" max="65"
                    required={!isAdmin}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password" name="password"
                    value={formData.password} onChange={handleChange}
                    className={`w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 ${isAdmin ? "focus:ring-purple-500" : "focus:ring-red-500"} focus:border-transparent transition-all`}
                    placeholder="••••••••" required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <input
                type="checkbox" id="terms" required
                className={`mt-1 w-4 h-4 border-gray-300 rounded ${isAdmin ? "text-purple-600 focus:ring-purple-500" : "text-red-600 focus:ring-red-500"}`}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className={`font-semibold hover:underline ${isAdmin ? "text-purple-600" : "text-red-600"}`}>Terms & Conditions</a>{" "}
                and{" "}
                <a href="#" className={`font-semibold hover:underline ${isAdmin ? "text-purple-600" : "text-red-600"}`}>Privacy Policy</a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r ${isAdmin ? "from-purple-600 to-indigo-600" : "from-red-600 to-rose-600"} text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : isAdmin ? (
                <><Shield className="w-5 h-5" /><span>Create Admin Account</span></>
              ) : (
                <><UserPlus className="w-5 h-5" /><span>Sign Up & Save Lives</span></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>

          <Link
            to="/login"
            className={`block w-full bg-white py-3 rounded-xl font-bold text-center border-2 transition-all duration-300 ${isAdmin ? "text-purple-600 border-purple-200 hover:border-purple-300 hover:bg-purple-50" : "text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50"}`}
          >
            Login to Your Account
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <a href="#" className="font-semibold text-red-600 hover:text-red-700 transition-colors">Contact Support</a>
          </p>
          <p className="text-xs text-gray-500">
            By signing up, you agree to help save lives through blood donation
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
    </div>
  );
};

export default Signup;