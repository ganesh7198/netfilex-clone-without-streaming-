import React, { useEffect, useState, useRef } from "react";
import SimilarMovieSevices from "../Services/SimilarMovieSevices";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function HorizontalMovieRow({movieid}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    async function fetchSimilarMovies() {
      try {
      const response = await SimilarMovieSevices(movieid);

        if (response?.error) {
          setError(response.error);
          return;
        }

        setMovies(response.results || []);
      } catch (err) {
        console.log(err)
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    }

    fetchSimilarMovies();
  }, [movieid]);



  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center py-8 text-red-400">{error}</p>;
  }

  return (
    <section className="relative px-6 py-8 bg-gradient-to-from-gray-950 to-black">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">More Like Trending movie</h2>
        </div>
      </div>

      {/* Movie Cards Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Hidden scrollbar styles */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group min-w-45 shrink-0 transition-all duration-300"
          >
            {/* Movie Card */}
            <div className="relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 group-hover:border-red-500/50 transition-all duration-300">
              {/* Poster */}
              <div className="relative h-67.5 overflow-hidden">
                <img
                  src={
                    movie.poster_path
                      ? `${IMAGE_BASE}${movie.poster_path}`
                      : "https://via.placeholder.com/180x270/1a1a1a/ffffff?text=No+Image"
                  }
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <button className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-3">
                <h3 className="text-white font-medium text-sm mb-1 line-clamp-1 group-hover:text-red-400 transition-colors">
                  {movie.title}
                </h3>
                <p className="text-gray-400 text-xs">
                  {movie.release_date?.split("-")[0] || "N/A"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HorizontalMovieRow;
