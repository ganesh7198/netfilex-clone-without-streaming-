// App.jsx
import React from "react";
import { Link } from "react-router-dom";
import TrendingMovieCompont from "../Comopontes/TrendingMovieCompont";


function Homepage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-bold">
                MI
              </div>
              <h1 className="text-2xl font-bold">
                Movie<span className="text-red-500">Info</span>
              </h1>
            </div>

            {/* Auth Links */}
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-5 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className=" absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1"
            alt="Cinema"
            className="w-full h-[70vh] object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Your Ultimate Movie & TV Database
            </h1>
            <p className="text-lg text-gray-300 mb-10">
              Discover movies, TV shows, cast, ratings, reviews, and the latest
              entertainment trends — all in one place.
            </p>

            <div className="flex space-x-4">
              <Link
                to="/signup"
                className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-lg font-semibold"
              >
                Join Free
              </Link>
              <Link
                to="/movies"
                className="px-8 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition text-lg"
              >
                Explore Movies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/*   trending moive   */}
       <TrendingMovieCompont></TrendingMovieCompont>
      {/* Stats */}
      <section className="bg-[#1e293b] py-16">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["500K+", "Movies"],
            ["100K+", "TV Shows"],
            ["2M+", "Actors"],
            ["10M+", "Reviews"],
          ].map(([value, label], i) => (
            <div key={i}>
              <div className="text-4xl font-bold text-red-500">{value}</div>
              <p className="text-gray-300 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600/20 to-purple-600/20 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Exploring Today</h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Create a free account and unlock the world’s most comprehensive
          entertainment database.
        </p>
        <Link
          to="/signup"
          className="px-10 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-lg font-semibold"
        >
          Create Free Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#020617] py-8 text-center text-gray-400 text-sm">
        © 2024 MovieInfo · Powered by TMDB
      </footer>
    </div>
  );
}

export default Homepage;
