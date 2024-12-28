import { useState, useEffect } from "react";
import useApiCall from "../../networks/api.js";
import { useNavigate } from "react-router-dom";

const GiveKudos = ({ userData }) => {

  const navigate = useNavigate();

  const [kudosData, setKudosData] = useState(null);
  const { data: usersOptions, makeApiCall: usersOptionsApi } = useApiCall();
  const { data: badgeOptions, makeApiCall: badgeOptionsApi } = useApiCall();
  const { makeApiCall: giveKudos } = useApiCall();

  useEffect(() => {
    if (userData?._id) {
      const customHeaders = { userid: userData._id };
      usersOptionsApi("/api/users/getAllUsers", "GET", null, customHeaders);
      badgeOptionsApi("/api/badge/getAllBadges", "GET", null, customHeaders);
    }
  }, [userData?._id]);

  const handleNavigate = () => {
    navigate("/landing");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customHeaders = { userid: userData._id };
    giveKudos("/api/kudos/addKudos",
      "POST",
      kudosData,
      customHeaders,
      handleNavigate
    );

  };

  const handleInputChange = (name, value) => {
    setKudosData({ ...kudosData, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg sticky top-0 z-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label
            htmlFor="receiver"
            className="block text-gray-700 font-semibold"
          >
            Select users
          </label>
          <select
            id="receiver"
            name="receiver"
            value={kudosData?.receiver ?? ""}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="" disabled>
              Select Kudos
            </option>
            {usersOptions &&
              Array.isArray(usersOptions) &&
              usersOptions.length > 0 &&
              usersOptions.map((kudos, index) => (
                <option key={index} value={kudos._id}>
                  {kudos.name}
                </option>
              ))}
          </select>
        </div>

        {/* Badge */}
        <div className="mb-4">
          <label htmlFor="badge" className="block text-gray-700 font-semibold">
            Select Badge
          </label>
          <select
            id="badge"
            name="badge"
            value={kudosData?.badge ?? ""}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="" disabled>
              Select Badge
            </option>
            {badgeOptions &&
              Array.isArray(badgeOptions) &&
              badgeOptions.length > 0 &&
              badgeOptions.map((badge, index) => (
                <option key={index} value={badge._id}>
                  {badge.label}
                </option>
              ))}
          </select>
        </div>

        {/* Reason */}
        <div className="mb-4">
          <label htmlFor="reason" className="block text-gray-700 font-semibold">
            Reason
          </label>
          <input
            type="text"
            id="reason"
            name="reason"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your reason here"
            value={kudosData?.reason}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 focus:outline-none"
        >
          Give Kudos
        </button>
      </form>
    </div>
  );
};

export default GiveKudos;
