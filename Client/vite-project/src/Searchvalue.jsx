import React from "react";
import { useLocation } from "react-router-dom";

const SearchValue = () => {
  const location = useLocation();
  const donors = location.state?.donors || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-red-600 animate-pulse">
        Matched Donors
      </h2>

      {donors.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No donors found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
            {/* Table Header */}
            <thead className="bg-red-600 text-white text-left">
              <tr>
                <th className="py-3 px-4 font-semibold">Blood Group</th>
                <th className="py-3 px-4 font-semibold">Hospital</th>
                <th className="py-3 px-4 font-semibold">Address</th>
                <th className="py-3 px-4 font-semibold">Donation Date</th>
                <th className="py-3 px-4 font-semibold">Phone</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {donors.map((donor, index) => (
                <tr
                  key={donor._id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition`}
                >
                  <td className="py-3 px-4 font-medium text-gray-800">{donor.bloodGroup}</td>
                  <td className="py-3 px-4 text-gray-800">{donor.NearestHospital}</td>
                  <td className="py-3 px-4 text-gray-800">{donor.Address}</td>
                  <td className="py-3 px-4 text-gray-800">{donor.Registerday}</td>
                  <td className="py-3 px-4 text-gray-800">{donor.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchValue;

