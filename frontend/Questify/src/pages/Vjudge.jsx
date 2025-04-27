import React, { useState } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Sparkles from "../components/ui/Sparkles";
const VJudgeTracker = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (username.trim() === "") return;

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/vjudge/${username.trim()}`);
      
      if (response.data.success) {
        navigate(`/vjudge/${username.trim()}`);
      } else {
        setError(response.data.error || "Failed to fetch user data");
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  return (<>
  
    <Navbar />
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
    <Sparkles className="w-full h-full" />
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-green-600 rounded-full p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
          </svg>
        </div>

        <div className="bg-zinc-900 p-8 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-green-500 text-center mb-2">VJudge Tracker</h1>
          <p className="text-center text-gray-400 mb-6">
            Enter a VJudge ID to view their solved problems and contest history
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-900 text-red-200 rounded-md text-sm">
              {error}
            </div>
          )}

          <label className="block text-gray-300 mb-1">VJudge ID</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter VJudge username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full bg-zinc-800 text-white rounded-md py-2 pl-10 pr-4 outline-none focus:ring-2 ring-green-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <button
            onClick={handleSearch}
            disabled={loading || !username.trim()}
            className={`mt-6 w-full ${
              loading || !username.trim()
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            } text-black font-semibold py-2 rounded-md transition duration-200 flex items-center justify-center`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </>
            ) : (
              'Search User'
            )}
          </button>
        </div>

        <p className="text-gray-500 mt-4 text-sm">
          Track your competitive programming progress with VJudge Tracker
        </p>
      </div>
    </div>
  );
</>)};

export default VJudgeTracker;
