import React, { useState } from "react";
import axios from "../config/axios";
import { Code2, Send } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeetCode = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Sending request to:', import.meta.env.VITE_BACKEND_URL);
      const response = await axios.post("/api/email/store-email", {
        email,
        platform: "LeetCode"
      });
      console.log('Response:', response);
      toast.success(response.data.message || "Successfully subscribed!");
      setEmail("");
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error(error.response?.data?.message || "Error subscribing. Please try again.");
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
          <h1 className="text-3xl font-bold text-white mb-2">LeetCode Daily Challenges</h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Master technical interviews and level up your coding skills with daily challenges from LeetCode,
            the premier platform for coding interview preparation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Why LeetCode?</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-1 mr-4">
                  <span className="text-xs text-white font-bold">1</span>
                </div>
                <span className="text-base">Perfect for tech interview preparation with problems commonly asked by top companies like Google, Meta, Amazon, and Microsoft.</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-1 mr-4">
                  <span className="text-xs text-white font-bold">2</span>
                </div>
                <span className="text-base">Comprehensive library of 2000+ problems categorized by data structures and algorithms.</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-1 mr-4">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
                <span className="text-base">Clear difficulty ratings (Easy, Medium, Hard) help you track your progress systematically.</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mt-1 mr-4">
                  <span className="text-xs text-white font-bold">4</span>
                </div>
                <span className="text-base">Vibrant community with detailed solutions, discussions, and approaches to each problem.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="bg-green-700 p-8 text-white">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Code2 size={28} className="text-white" />
                <h2 className="text-2xl font-bold">LeetCode Daily</h2>
              </div>
              <p className="text-gray-100 text-center">
                Get a new LeetCode challenge in your inbox every day!
              </p>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-400"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-4 bg-green-700 text-white rounded-lg font-medium
                    ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-green-800'}
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
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mb-4">
                <Code2 size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Daily Problems</h3>
              <p className="text-gray-300">
                Receive one carefully selected problem each day that matches your skill level and helps you improve
              </p>
            </div>
          
            <div className="bg-gray-700 p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Interview Readiness</h3>
              <p className="text-gray-300">
                Build your confidence and readiness for technical interviews through consistent practice with problems commonly asked by top tech companies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetCode;