// Components/Navbar.jsx
import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-gray-800">
      <div className="flex items-center justify-between px-10 py-4">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <h1 className="text-2xl font-extrabold text-red-500 tracking-wide cursor-pointer">
            MovieInfo
          </h1>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-gray-300 text-sm font-medium">
            <button className="hover:text-white transition">Movies</button>
            <button className="hover:text-white transition">TV Series</button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search movies, shows..."
              className="bg-[#020617] pl-10 pr-4 py-2 rounded-lg border border-gray-700 text-sm text-white focus:outline-none focus:border-red-500 w-64"
            />
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2"
            >
              <img
                src="https://i.imgur.com/6VBx3io.png"
                alt="profile"
                className="w-9 h-9 rounded-full object-cover border border-gray-700"
              />
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 w-40 bg-[#020617] border border-gray-800 rounded-lg shadow-lg overflow-hidden">
                <button className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-gray-800">
                  Profile
                </button>
                <button className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-gray-800">
                  Settings
                </button>
                <button className="w-full px-4 py-3 text-left text-sm text-red-500 hover:bg-gray-800">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
