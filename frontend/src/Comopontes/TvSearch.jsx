import React, { useEffect, useState } from "react";
import axios from "axios";

function TvSearch({ search }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!search) return; // Don't fetch if search is empty
    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:5000/api/v1/search/tvseries/${search}`,{withCredentials:true})
      .then((res) => {
        setResults(res.data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch TV series.");
        setLoading(false);
      });
  }, [search]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!results.length) return <p className="text-center mt-10 text-gray-400">No results found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {results.map((tv) => (
        <div
          key={tv.id}
          className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
        >
          {tv.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${tv.poster_path}`}
              alt={tv.name}
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-gray-600">
              No Image
            </div>
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{tv.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              {tv.overview?.slice(0, 100)}...
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
              ⭐ {tv.vote_average} | {tv.first_air_date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TvSearch;
