import React, { useState } from "react";
import axios from "axios";
import { Code2, Send } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Codeforces = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("https://questify-backend-gqvx.onrender.com/store-email", {
        email,
        platform: "Codeforces"
      });
      toast.success(response.data.message || "Successfully subscribed!");
      setEmail("");
    } catch (error) {
      toast.error("Error subscribing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4">
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar 
        theme="dark" 
      />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Codeforces Daily Challenges</h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Improve your competitive programming skills with daily challenges from Codeforces, 
            one of the leading competitive programming platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Increased the width by using max-w-6xl above and making these full width */}
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Why Codeforces?</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center mt-1 mr-4">
                  <span className="text-xs text-white font-bold">1</span>
                </div>
                <span className="text-base">Enhances problem-solving, logical reasoning, coding speed, and algorithmic thinking—essential for tech interviews and real-world dev.</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center mt-1 mr-4">
                  <span className="text-xs text-white font-bold">2</span>
                </div>
                <span className="text-base">Problems across various difficulty levels</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center mt-1 mr-4">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
                <span className="text-base">Problems are well-constructed, creative, and test algorithmic depth and implementation skills.</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center mt-1 mr-4">
                  <span className="text-xs text-white font-bold">4</span>
                </div>
                <span className="text-base"> Codeforces has one of the largest and most active CP communities, offering discussions, tutorials, and mentorship</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="bg-red-700 p-8 text-white">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Code2 size={28} className="text-white" />
                <h2 className="text-2xl font-bold">Codeforces Daily</h2>
              </div>
              <p className="text-gray-100 text-center">
                Get a new Codeforces challenge in your inbox every day!
              </p>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-4 bg-red-700 text-white rounded-lg font-medium
                    ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-red-800'}
                    transition-all duration-200`}
                >
                  <span>{isLoading ? 'Subscribing...' : 'Subscribe Now'}</span>
                  {!isLoading && <Send size={18} className="ml-2" />}
                </button>
              </form>

              <p className="text-xs text-gray-400 text-center mt-4">
                By subscribing, you agree to receive daily coding challenges.
                You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6 px-2">What to Expect</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-4">
                <Code2 size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Daily Problems</h3>
              <p className="text-gray-300">
                Receive one carefully selected problem each day to solve at your own pace
              </p>
            </div>
          
            <div className="bg-gray-700 p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Skill Progression</h3>
              <p className="text-gray-300">
              Consistent effort leads to measurable improvement—Codeforces allows you to track your growth over time through a well-structured difficulty ladder, helping you gradually master increasingly complex problems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Codeforces;