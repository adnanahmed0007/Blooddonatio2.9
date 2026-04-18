import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Droplet, Calendar, MapPin, Hospital, Heart, CheckCircle, Users, Activity } from "lucide-react";

const Donate = () => {
  const [formData, setFormData] = useState({
    bloodGroup: "",
    Registerday: "",
    Address: "",
    NearestHospital: "",
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `https://blooddonatio2-9.onrender.com/auth/dontaion/api/donation/api/register`,
        formData,
        { withCredentials: true }
      );
      console.log(res);
      setLoading(false);

      toast.success("🎉 You have registered successfully! Thank you ❤️", {
        position: "top-center",
        autoClose: 3000,
      });

      // clear form
      setFormData({
        bloodGroup: "",
        Registerday: "",
        Address: "",
        NearestHospital: "",
      });
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 px-4 py-12">

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-rose-600 rounded-2xl shadow-xl mb-4 animate-pulse">
            <Heart className="w-8 h-8 text-white fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Donate Blood & Save Lives
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your single act of kindness today can save multiple lives tomorrow.
            <br />
            <span className="font-semibold text-red-600">Be the reason someone gets a second chance.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Info Cards */}
          <div className="space-y-6">

            {/* Impact Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6 text-red-600" />
                Your Impact
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Heart, text: "1 donation = 3 lives saved" },
                  { icon: Users, text: "Join 8,500+ active donors" },
                  { icon: CheckCircle, text: "Safe & professional" }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 text-gray-700">
                      <Icon className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Requirements Card */}
            <div className="bg-gradient-to-br from-red-600 to-rose-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Requirements</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Age: 18-65 years</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Weight: Minimum 50 kg</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Good health condition</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Last donation: 3+ months ago</span>
                </li>
              </ul>
            </div>

            {/* Stats Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200">
              <div className="text-center">
                <div className="text-4xl font-black text-red-600 mb-1">12,000+</div>
                <div className="text-sm text-gray-600 font-medium">Lives Saved This Year</div>
              </div>
            </div>
          </div>

          {/* Right Column - Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200">

              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-rose-600 rounded-xl flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Donation Registration</h2>
                  <p className="text-sm text-gray-600">Fill in your details to schedule a donation</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Blood Group */}
                <div className="space-y-2">
                  <label htmlFor="bloodGroup" className="block text-sm font-semibold text-gray-700">
                    Blood Group
                  </label>
                  <div className="relative">
                    <Droplet className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Donation Day */}
                <div className="space-y-2">
                  <label htmlFor="Registerday" className="block text-sm font-semibold text-gray-700">
                    Preferred Donation Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      id="Registerday"
                      name="Registerday"
                      value={formData.Registerday}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label htmlFor="Address" className="block text-sm font-semibold text-gray-700">
                    Your Full Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      id="Address"
                      name="Address"
                      placeholder="Enter your complete address with city and pincode"
                      value={formData.Address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                      required
                    />
                  </div>
                </div>

                {/* Nearest Hospital */}
                <div className="space-y-2">
                  <label htmlFor="NearestHospital" className="block text-sm font-semibold text-gray-700">
                    Nearest Hospital / Blood Center
                  </label>
                  <div className="relative">
                    <Hospital className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="NearestHospital"
                      name="NearestHospital"
                      placeholder="Enter nearest hospital or blood donation center"
                      value={formData.NearestHospital}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Important Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Our team will contact you 24 hours before your scheduled donation date to confirm.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 fill-current" />
                      <span>Register & Save Lives</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer />

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Donate;