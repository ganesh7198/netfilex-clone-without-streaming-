import React from "react";
import Loginhook from "../Customhooks/Loginhook";

function Loginpage() {
  const { form, loading, error, handleChange, handleSubmit } = Loginhook();
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1e293b] rounded-xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h2>
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full bg-[#020617] text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="w-full bg-[#020617] text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Loginpage;
