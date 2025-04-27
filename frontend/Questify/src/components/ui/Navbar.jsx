import React from "react";
import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full bg-black py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="flex items-center text-white">
          <span className="text-xl font-semibold">
          <Link to="/" className="text-xl font-bold text-gray-300 flex items-center">
              <Code2 className="w-6 h-6 mr-2" />
              CodeMaster Hub
            </Link>
            </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;