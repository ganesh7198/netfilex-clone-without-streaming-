// Components/HeroTrending.jsx
import React, { useEffect, useState } from "react";
import TrendingMovieServices from "../Services/TrendingMovieServices";
import { FaFire, FaStar, FaPlay, FaInfoCircle } from "react-icons/fa";

const IMAGE_BASE = "https://image.tmdb.org/t/p/";

function InnerHomeTrendingMovie({setmovieid}) {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      const result = await TrendingMovieServices();
      if (result?.error) setError(result.error);
      else{ 
        setmovieid(result.id);
        setMovie(result);}
    }
    fetchMovie();
},[setmovieid]);

  if (error) {
    return (
      <div className="text-center py-10 text-red-400">Error loading movie</div>
    );
  }

  if (!movie) return <div className="h-[90vh] bg-gray-900 animate-pulse"></div>;

  // Choose the best available image
  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE}original${movie.backdrop_path}`
    : movie.poster_path
    ? `${IMAGE_BASE}original${movie.poster_path}`
    : "";

  return (
    <section className="relative h-screen min-h-[700px] max-h-[90vh] overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        {backdropUrl && (
          <>
            {/* Blurred Background for Loading/Backup */}
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-sm scale-105"
              style={{
                backgroundImage: `url(${IMAGE_BASE}w500${
                  movie.backdrop_path || movie.poster_path
                })`,
                backgroundSize: "cover",
              }}
            />

            {/* Main Image */}
            <img
              src={backdropUrl}
              alt={movie.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="eager"
              decoding="async"
            />

            {/* Loading Placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 animate-pulse" />
            )}
          </>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-5xl">
        {/* Trending Badge - Top Left */}
        <div className="absolute top-8 left-6 md:top-12 md:left-12">
          <div className="flex items-center gap-2 animate-pulse">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-70"></div>
              <div className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full shadow-lg">
                <FaFire className="text-xl animate-bounce" />
                <span className="text-sm md:text-base">TRENDING NOW</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto mb-12">
          {/* Movie Title with Trending Indicator */}
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {movie.title}
            </h1>

            {/* Hot Badge beside title */}
            <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full">
              <FaFire className="text-sm" />
              <span className="text-xs font-bold">HOT</span>
            </div>
          </div>

          {/* Movie Info Row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Rating with Star */}
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg">
              <FaStar className="text-yellow-400" />
              <span className="text-white font-bold">
                {movie.vote_average?.toFixed(1)}
              </span>
              <span className="text-gray-300 text-sm">/10</span>
            </div>

            {/* Year */}
            <div className="bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg">
              <span className="text-white">
                {movie.release_date?.split("-")[0]}
              </span>
            </div>

            {/* Runtime if available */}
            {movie.runtime && (
              <div className="bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg">
                <span className="text-white">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              </div>
            )}

            {/* Popularity Indicator */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-orange-500/30">
              <FaFire className="text-orange-400 text-sm" />
              <span className="text-white text-sm font-medium">
                {movie.popularity?.toFixed(0)} Popularity
              </span>
            </div>
          </div>

          {/* Overview */}
          <p className="text-gray-200 text-lg mb-8 max-w-3xl leading-relaxed">
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="group px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-red-500/30 hover:scale-105">
              <FaPlay className="text-white group-hover:animate-pulse" />
              <span>Watch Trailer</span>
            </button>

          
          </div>

          {/* Genres (if available) */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {movie.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full border border-white/20"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default InnerHomeTrendingMovie;
