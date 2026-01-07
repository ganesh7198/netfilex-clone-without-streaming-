import React, { useEffect, useState } from "react";
import TrendingMovieServices from "../services/TrendingMovieServices";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function TrendingMovieCompont() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      const result = await TrendingMovieServices();
      if (result?.error) setError(result.error);
      else setMovie(result);
    }
    fetchMovie();
  }, []);

  if (error) {
    return <div className="text-center py-10 text-red-400"></div>;
  }

  if (!movie) return null;

  return (
    <section className="relative h-[100vh] w-full">
      {/* Background Image */}
      <img
        src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-xl">
          <span className="text-red-500 font-semibold uppercase tracking-wide">
            Trending Now
          </span>

          <h2 className="text-4xl font-bold mt-2 mb-4">{movie.title}</h2>

          <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>📅 {movie.release_date}</span>
            <span>🔥 {Math.round(movie.popularity)}</span>
          </div>

          <p className="text-gray-300 line-clamp-3 mb-6">{movie.overview}</p>
        </div>
      </div>
    </section>
  );
}

export default TrendingMovieCompont;
