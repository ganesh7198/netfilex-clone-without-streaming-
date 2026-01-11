import React, { useEffect, useState } from "react";
import axios from "axios";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const API_URL = "http://localhost:5000/api/v1/tvseries/trendingseries";

function TrendingTvSeriesComponent({settvid}) {
  const [tv, setTv] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingTvSeries = async () => {
      try {
        const response = await axios.get(API_URL, {
          withCredentials: true,
        });

        // Backend response: { success: true, content: {...} }
        setTv(response.data.content);
        settvid(response.data.content.id);
      } catch (err) {
        setError("Failed to load trending TV series");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTvSeries();
  }, [settvid]);

  if (loading) {
    return (
      <section className="h-[100vh] flex items-center justify-center bg-black text-white">
        <span className="animate-pulse text-lg">Loading...</span>
      </section>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-400">{error}</div>;
  }

  if (!tv) return null;

  return (
    <section className="relative h-[100vh] w-full">
      {/* Background Image */}
      <img
        src={`${IMAGE_BASE_URL}${tv.backdrop_path || tv.poster_path}`}
        alt={tv.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-xl">
          <span className="text-red-500 font-semibold uppercase tracking-wide">
            Trending Now
          </span>

          <h2 className=" text-4xl font-bold mt-2 mb-4  text-white">
            {tv.name}
          </h2>

          <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
            <span>⭐ {tv.vote_average.toFixed(1)}</span>
            <span>📺 {tv.first_air_date}</span>
            <span>🔥 {Math.round(tv.popularity)}</span>
          </div>

          <p className="text-gray-300 line-clamp-3 mb-6">{tv.overview}</p>
        </div>
      </div>
    </section>
  );
}

export default TrendingTvSeriesComponent;
