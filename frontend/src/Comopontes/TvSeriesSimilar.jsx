import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FiStar } from "react-icons/fi";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function TvSeriesSimilar({ tvid }) {
  const [tvSeries, setTvSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!tvid) return;

    async function fetchSimilarTvSeries() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:5000/api/v1/tvseries/${tvid}/similar`,
          { withCredentials: true }
        );

        // ✅ CORRECT PATH BASED ON YOUR API
        setTvSeries(response.data?.similar?.results || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load similar TV series");
      } finally {
        setLoading(false);
      }
    }

    fetchSimilarTvSeries();
  }, [tvid]);

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  /* ---------------- Error ---------------- */
  if (error) {
    return <p className="text-center py-8 text-red-400">{error}</p>;
  }

  if (!tvSeries.length) {
    return (
      <p className="text-center py-8 text-gray-400">
        No similar TV series found
      </p>
    );
  }

  return (
    <section className="relative px-6 py-10 bg-gradient-to-b from-gray-950 to-black">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">More Like This</h2>
      </div>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hide scrollbar */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {tvSeries.map((tv) => (
          <div
            key={tv.id}
            className="group min-w-[180px] flex-shrink-0 transition-all duration-300"
          >
            {/* Card */}
            <div className="relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 group-hover:border-red-500/60 transition-all duration-300">
              {/* Poster */}
              <div className="relative h-[270px] overflow-hidden">
                <img
                  src={
                    tv.poster_path
                      ? `${IMAGE_BASE}${tv.poster_path}`
                      : "https://via.placeholder.com/180x270/1a1a1a/ffffff?text=No+Image"
                  }
                  alt={tv.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <button className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded">
                    View Details
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="text-white font-medium text-sm mb-1 line-clamp-1 group-hover:text-red-400">
                  {tv.name}
                </h3>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>
                    {tv.first_air_date
                      ? tv.first_air_date.split("-")[0]
                      : "N/A"}
                  </span>

                  {tv.vote_average > 0 && (
                    <span className="flex items-center gap-1 text-yellow-400">
                      <FiStar size={12} />
                      {tv.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TvSeriesSimilar;
