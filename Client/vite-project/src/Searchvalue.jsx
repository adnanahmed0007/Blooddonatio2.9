import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Heart, MapPin, Calendar, Phone, Search,
  AlertCircle, ArrowLeft, Droplet, Building2
} from "lucide-react";

const BloodBadge = ({ group }) => (
  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center flex-shrink-0 shadow-lg">
    <span className="text-sm font-black text-white">{group}</span>
  </div>
);

const InfoRow = ({ icon: Icon, label, text }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon className="w-4 h-4 text-red-500" />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
      <p className="text-sm text-gray-800 font-semibold truncate">{text || "Not specified"}</p>
    </div>
  </div>
);

const DonorCard = ({ donor, index }) => {
  const formattedDate = donor.Registerday
    ? (() => {
      const d = new Date(donor.Registerday);
      return isNaN(d) ? donor.Registerday : d.toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      });
    })()
    : "Not specified";

  return (
    <div
      className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 p-6 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-2"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Card Header */}
      <div className="flex items-center gap-4">
        <BloodBadge group={donor.bloodGroup} />
        <div className="min-w-0 flex-1">
          <p className="font-black text-gray-900 text-lg truncate">
            {donor.name || "Anonymous Donor"}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-bold text-green-600">Available to Donate</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-200"></div>

      {/* Info Rows */}
      <div className="flex flex-col gap-4">
        <InfoRow icon={Building2} label="Nearest Hospital" text={donor.NearestHospital} />
        <InfoRow icon={MapPin} label="Address" text={donor.Address} />
        <InfoRow icon={Calendar} label="Available From" text={formattedDate} />
        <InfoRow icon={Phone} label="Contact" text={String(donor.phoneNumber)} />
      </div>

      {/* CTA */}
      <a
        href={`tel:${donor.phoneNumber}`}
        className="mt-auto w-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-sm font-bold py-3 rounded-2xl flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
      >
        <Phone className="w-4 h-4" />
        <span>Call Donor</span>
      </a>
    </div>
  );
};

const EmptyState = ({ navigate }) => (
  <div className="flex flex-col items-center justify-center py-32 text-center">
    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 border-2 border-red-100">
      <Droplet className="w-12 h-12 text-red-300" />
    </div>
    <h3 className="text-2xl font-black text-gray-900 mb-2">No donors found</h3>
    <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
      We couldn't find any matching donors right now. Try a different blood group or location.
    </p>
    <button
      onClick={() => navigate("/search")}
      className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Search Again</span>
    </button>
  </div>
);

const SearchValue = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // donors can come from navigation state OR we fetch all from API
  const [donors, setDonors] = useState(location.state?.donors || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If no donors passed via navigation, fetch all from your API
    if (donors.length === 0) {
      setLoading(true);
      axios
        .get("http://localhost:9090/auth/dontaion/api/donation/api/getall", {
          withCredentials: true,
        })
        .then((res) => {
          // handle both { fectchadat: [...] } and plain array
          const data = res.data?.fectchadat || res.data || [];
          setDonors(data);
        })
        .catch((err) => {
          console.error("Failed to fetch donors", err);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50 px-4 py-12">

      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate("/search")}
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-semibold mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Search</span>
        </button>

        {/* Page Header */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-rose-600 rounded-2xl flex items-center justify-center shadow-xl">
            <Heart className="w-7 h-7 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900">Matched Donors</h1>
            <p className="text-gray-500 mt-0.5">
              {loading
                ? "Looking for donors..."
                : donors.length > 0
                  ? `${donors.length} donor${donors.length > 1 ? "s" : ""} found — scroll to explore`
                  : "No donors matched your search"}
            </p>
          </div>
          {donors.length > 0 && !loading && (
            <span className="ml-auto bg-red-50 text-red-700 font-bold text-sm px-4 py-2 rounded-full border border-red-100">
              {donors.length} result{donors.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/80 rounded-3xl border border-gray-100 p-6 flex flex-col gap-5 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gray-200"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="border-t border-gray-100"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map(j => (
                    <div key={j} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100"></div>
                      <div className="flex-1 space-y-1">
                        <div className="h-2 bg-gray-100 rounded w-1/3"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-10 bg-gray-200 rounded-2xl"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty or Results */}
        {!loading && (
          donors.length === 0 ? (
            <EmptyState navigate={navigate} />
          ) : (
            <>
              {/* Privacy Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 mb-8">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  <strong>Privacy:</strong> Contact details are only visible to verified users.
                  Please reach out to donors respectfully and only for genuine medical needs.
                </p>
              </div>

              {/* Donor Cards Grid — scrollable on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {donors.map((donor, index) => (
                  <DonorCard key={donor._id || index} donor={donor} index={index} />
                ))}
              </div>

              {/* Footer CTA */}
              <div className="mt-14 bg-gradient-to-br from-red-600 to-rose-600 rounded-3xl p-10 text-center text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full opacity-5 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full opacity-5 -ml-20 -mb-20"></div>
                <div className="relative">
                  <h3 className="text-2xl font-black mb-2">Didn't find the right match?</h3>
                  <p className="text-red-100 mb-6 text-sm">Try a different blood group or location to find more donors.</p>
                  <button
                    onClick={() => navigate("/search")}
                    className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Again</span>
                  </button>
                </div>
              </div>
            </>
          )
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default SearchValue;