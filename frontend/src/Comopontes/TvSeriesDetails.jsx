import React, { useEffect, useState } from "react";
import axios from "axios";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function TvSeriesDetails({ tvid }) {
  const [tv, setTv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tvid) return;

    async function fetchDetails() {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/tvseries/${tvid}/details`,
          { withCredentials: true }
        );

        setTv(response.data.details);
      } catch (err) {
        console.error(err);
        setError("Failed to load TV series details");
        setTv(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [tvid]);

  if (!tvid || loading) {
    return (
      <p className="p-8 text-gray-400 text-center">
        {tvid ? "Loading TV series details..." : "Waiting for selection..."}
      </p>
    );
  }

  if (error) return <p className="p-8 text-red-500 text-center">{error}</p>;
  if (!tv)
    return <p className="p-8 text-gray-400 text-center">No TV series found.</p>;

  return (
    <section className="relative w-full min-h-screen bg-black text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: tv.backdrop_path
            ? `url(${IMAGE_BASE}${tv.backdrop_path})`
            : "none",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row gap-8 p-10">
        {/* Poster */}
        {tv.poster_path && (
          <img
            src={`${IMAGE_BASE}${tv.poster_path}`}
            alt={tv.name}
            className="w-[200px] md:w-[220px] rounded-lg shadow-lg"
          />
        )}

        {/* Details */}
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-2 text-white">{tv.name}</h1>
          {tv.tagline && (
            <p className="italic text-gray-400 mb-4">{tv.tagline}</p>
          )}
          {tv.overview && <p className="text-gray-300 mb-6">{tv.overview}</p>}

          {/* Info Row */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-4">
            {tv.vote_average && (
              <span>⭐ {tv.vote_average.toFixed(1)} / 10</span>
            )}
            {tv.episode_run_time?.length > 0 && (
              <span>🕒 {tv.episode_run_time[0]} min</span>
            )}
            {tv.first_air_date && <span>📅 {tv.first_air_date}</span>}
            {tv.number_of_seasons && (
              <span>🎬 {tv.number_of_seasons} Seasons</span>
            )}
            {tv.number_of_episodes && (
              <span>📺 {tv.number_of_episodes} Episodes</span>
            )}
            {tv.status && <span>📌 {tv.status}</span>}
          </div>

          {/* Genres */}
          {tv.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tv.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Created By */}
          {tv.created_by?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Created By</h3>
              <div className="flex gap-4 flex-wrap">
                {tv.created_by.map((creator) => (
                  <div key={creator.id} className="text-center">
                    {creator.profile_path && (
                      <img
                        src={`${IMAGE_BASE}${creator.profile_path}`}
                        alt={creator.name}
                        className="w-20 h-20 rounded-full object-cover mb-1"
                      />
                    )}
                    <p className="text-sm text-gray-300">{creator.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Networks */}
          {tv.networks?.length > 0 && (
            <div className="flex flex-wrap gap-6 mt-6">
              {tv.networks.map((network) => (
                <div key={network.id} className="text-center">
                  {network.logo_path && (
                    <img
                      src={`${IMAGE_BASE}${network.logo_path}`}
                      alt={network.name}
                      className="w-20 h-auto object-contain mb-1"
                    />
                  )}
                  <p className="text-xs text-gray-300">{network.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TvSeriesDetails;
