import { useEffect, useCallback } from "react";
import useApiCall from "../../networks/api.js";
import { useNavigate } from "react-router-dom";
import KudosCard from "../KudosCard/KudosCard";
import Loading from "../Loading/Loading";


const Landing = ({ userData }) => {
  const navigate = useNavigate();
  const { loading, data, error, makeApiCall } = useApiCall();
  const { makeApiCall: likedApiFun } = useApiCall();

  const getKudos = useCallback(async () => {

    const customHeaders = { userid: userData._id };
    const URL = "/api/kudos/getAllKudos";
    await makeApiCall(URL, "GET", null, customHeaders);

  }, [userData?._id, makeApiCall]);

  useEffect(() => {
    if (!userData?._id) return; 
    getKudos();
   
  }, [userData?._id]);

  const handleLikeToggle = async (kudosId, status = null) => {
    if (!kudosId || status == null) {
      return;
    }
    const URL = "/api/kudos/kudosLikeAddOrRemove";
    const customHeaders = { userid: userData._id };
    const body = { kudosId: kudosId, isLiked: status };
    await likedApiFun(URL, "PUT", body, customHeaders, getKudos);
  };
  const handleAddKudos = async () => {
    navigate("/givekudos");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6">
      {/* Header */}
      <header className="flex justify-between items-center w-full px-6 max-w-4xl">
        <h1 className="text-2xl font-bold">
          Welcome {userData?.name || "User"}!
        </h1>
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
          onClick={() => handleAddKudos()}
        >
          Give Kudo
        </button>
      </header>

      {/* News Feed */}
      <div className="mt-8 w-full max-w-4xl">
        {loading ? (
          <Loading />
        ) : data && Array.isArray(data) && data.length > 0 ? (
          <div className="max-h-[70vh] overflow-auto">
            {data.map((item, index) => (
              <KudosCard
                item={item}
                key={index}
                handleLikeToggle={handleLikeToggle}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No kudos available.</p>
        )}
        {error && (
          <span className="text-red-500" title={error}>
            {error}
          </span>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-8 flex justify-center items-center w-full">
        <button
          className="bg-gray-200 p-4 rounded-full shadow-md hover:bg-gray-300 transition"
          onClick={() => navigate("/analytics")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 20l-5.447-2.724A2 2 0 013 15.382V5.618a2 2 0 011.553-1.947L9 1m6 19l5.447-2.724A2 2 0 0021 15.382V5.618a2 2 0 00-1.553-1.947L15 1m-6 0h6"
            />
          </svg>
        </button>
      </footer>
    </div>
  );
};

export default Landing;
