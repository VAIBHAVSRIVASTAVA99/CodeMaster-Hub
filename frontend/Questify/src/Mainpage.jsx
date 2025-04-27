import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Code2, Trophy } from 'lucide-react';
import Home from './App';
function MainPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-gray-900 border-b border-gray-900 fixed w-full top-2 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-xl font-bold text-gray-300 flex items-center">
              <Code2 className="w-6 h-6 mr-2" />
              CodeMaster Hub
            </Link>
            <div className="flex space-x-6">
              <Link
                to="leetcode"
                className="inline-flex items-center px-4 py-2 border-b-2 border-transparent hover:border-cyan-400 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Code2 className="w-5 h-5 mr-2" />
                LeetCode
              </Link>
              <Link
                to="codeforces"
                className="inline-flex items-center px-4 py-2 border-b-2 border-transparent hover:border-cyan-400 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Codeforces
              </Link>
              <Link
                to="codechef"
                className="inline-flex items-center px-4 py-2 border-b-2 border-transparent hover:border-cyan-400 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Code2 className="w-5 h-5 mr-2" />
                Codechef
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20 px-4 pb-10">
        <Outlet />
      </main>

      <footer className="bg-[#0f0f0f] border-t border-gray-800 text-gray-400 text-sm text-center py-4">
        © 2025 CodeMaster Hub. All rights reserved.
      </footer>
    </div>
  );
}

export default MainPage;
