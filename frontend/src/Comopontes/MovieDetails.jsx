// Components/MovieDetails.jsx
import React, { useEffect, useState } from "react";
import moviedetailsservice from "../Services/moviedetailsservice";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function MovieDetails({ movieid }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // If movieid is not set, wait
    if (!movieid) {
      setMovie(null);
      setError("");
      setLoading(false);
      return;
    }

    async function fetchDetails() {
      setLoading(true);
      setError("");
      try {
        const response = await moviedetailsservice(movieid);

        if (!response) {
          setError("No data received");
          setMovie(null);
          return;
        }

        // Adjust according to API response
        // If your service returns { details: {...} } use response.details
        setMovie(response.details || response);

      } catch (err) {
        console.error(err);
        setError("Failed to load movie details");
        setMovie(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [movieid]);

  // Show loader while waiting for movieid or fetching
  if (!movieid || loading) {
    return (
      <p className="p-8 text-gray-400 text-center">
        {movieid ? "Loading movie details..." : "Waiting for movie selection..."}
      </p>
    );
  }

  // Show error if any
  if (error) {
    return <p className="p-8 text-red-500 text-center">{error}</p>;
  }

  // If movie is null after loading, show message
  if (!movie) {
    return <p className="p-8 text-gray-400 text-center">No movie found.</p>;
  }

  return (
    <section className="relative w-full min-h-screen bg-black text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(${IMAGE_BASE}${movie.backdrop_path})`
            : "none",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row gap-8 p-10">
        {/* Poster */}
        {movie.poster_path && (
          <img
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            className="w-[280px] rounded-lg shadow-lg"
          />
        )}

        {/* Details */}
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          {movie.tagline && (
            <p className="italic text-gray-400 mb-4">{movie.tagline}</p>
          )}
          {movie.overview && (
            <p className="text-gray-300 mb-6">{movie.overview}</p>
          )}

          {/* Info Row */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-4">
            {movie.vote_average && <span>⭐ {movie.vote_average.toFixed(1)} / 10</span>}
            {movie.runtime && <span>🕒 {movie.runtime} min</span>}
            {movie.release_date && <span>📅 {movie.release_date}</span>}
            {movie.revenue && (
              <span>💰 ${movie.revenue.toLocaleString()}</span>
            )}
            {movie.production_countries && movie.production_countries.length > 0 && (
              <span>
                🌎 {movie.production_countries.map((c) => c.name).join(", ")}
              </span>
            )}
          </div>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Production Companies */}
          {movie.production_companies && movie.production_companies.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {movie.production_companies.map((company) => (
                <div
                  key={company.id}
                  className="flex flex-col items-center text-center"
                >
                  {company.logo_path && (
                    <img
                      src={`${IMAGE_BASE}${company.logo_path}`}
                      alt={company.name}
                      className="w-20 h-auto mb-1 object-contain"
                    />
                  )}
                  <span className="text-gray-300 text-xs">{company.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
