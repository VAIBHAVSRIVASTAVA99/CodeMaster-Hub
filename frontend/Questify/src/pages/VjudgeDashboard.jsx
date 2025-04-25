import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';

const VJudgeDashboard = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDates, setExpandedDates] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        console.log('Fetching data for username:', username);
        const response = await axios.get(`/api/vjudge/${username}`);
        console.log('Backend response:', response.data);
        
        if (response.data && response.data.success) {
          setUserData(response.data);
        } else {
          setError(response.data?.error || "Failed to fetch user data");
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.error || err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const toggleDateExpansion = (date) => {
    setExpandedDates(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  console.log('Current userData:', userData);
  console.log('Loading state:', loading);
  console.log('Error state:', error);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
          <p className="mt-4 text-gray-400">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-zinc-900 p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-red-500 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error}</p>
          </div>
          <button
            onClick={() => navigate('/vjudge')}
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-md transition duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userData || !userData.data) {
    console.log('No user data available');
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p>No data available for this user</p>
          <button
            onClick={() => navigate('/vjudge')}
            className="mt-4 bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2 rounded-md transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const problems = userData.data.data || [];
  console.log('Problems array:', problems);

  return (
    <div className="min-h-screen bg-black pt-5">

<div className="bg-zinc-900 border-b border-zinc-800 relative">
  <div className="max-w-7xl mx-auto px-4 py-4 flex items-center relative">
    <button
      onClick={() => navigate('/')}
      className="text-gray-400 hover:text-white flex items-center justify-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back
    </button>

    <h1 className="absolute left-1/2 transform -translate-x-1/2 text-green-500 text-xl font-bold text-center">
      VJudge Tracker - {username}
    </h1>
  </div>
</div>


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-500/10 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">Total Problems</p>
                <p className="text-2xl font-bold text-white">{userData?.totalProblemsFound || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-900 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">Active Days</p>
                <p className="text-2xl font-bold text-white">
                  {userData?.data?.filter(day => day.count > 0).length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-purple-500/10 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">Last Updated</p>
                <p className="text-2xl font-bold text-white">
                  {new Date(userData?.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Problem History */}
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Problem History</h2>
          <div className="space-y-4">
            {userData?.data
              ?.filter(day => day.count > 0)
              ?.sort((a, b) => new Date(b.date) - new Date(a.date))
              ?.map((day, index) => (
                <div key={index} className="border border-zinc-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleDateExpansion(day.date)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-1 h-12 rounded-full"
                        style={{ backgroundColor: day.color }}
                      ></div>
                      <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
                        </svg>
                        <span className="text-white font-medium">
                          {day.problems && day.problems[0]?.contest || 'Practice Problems'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-400">{new Date(day.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="bg-green-500/10 px-3 py-1 rounded-full">
                        <span className="text-green-500 text-sm">{day.count} problems</span>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 text-gray-400 transform transition-transform ${expandedDates[day.date] ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {expandedDates[day.date] && day.problems && (
                    <div className="bg-zinc-900 px-6 py-4">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-zinc-800">
                          <thead>
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Problem
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Contest
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Platform
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-zinc-900 divide-y divide-zinc-800">
                            {day.problems.map((problem, pIndex) => (
                              <tr key={pIndex} className="hover:bg-zinc-800/50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                  {problem.title || 'Unknown Problem'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                  {problem.contest || 'Practice'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                  {problem.origin || 'VJudge'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VJudgeDashboard;