import React, { useEffect, useState } from "react";
import axios from "axios";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function TvSearch({ search }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!search) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/v1/search/tvseries/${search}`,
          { withCredentials: true }
        );
        setResults(data?.results || []);
      } catch (err) {
        console.error(err);
        setError();
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  if (loading)
    return <p className="text-center mt-10 text-gray-400"></p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!results.length)
    return <p className="text-center mt-10 text-gray-500"></p>;

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h2 className="text-4xl text-red-500 mb-8 font-bold">TV Series</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((tv) => (
          <div
            key={tv.id}
            className="bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
          >
            {tv.poster_path ? (
              <img
                src={`${IMAGE_BASE}${tv.poster_path}`}
                alt={tv.name}
                loading="lazy"
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{tv.name}</h3>
              <p className="text-gray-300 text-sm mt-2">
                {tv.overview?.slice(0, 100)}...
              </p>
              <p className="text-gray-400 text-xs mt-2">
                ⭐ {tv.vote_average} | {tv.first_air_date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TvSearch;
