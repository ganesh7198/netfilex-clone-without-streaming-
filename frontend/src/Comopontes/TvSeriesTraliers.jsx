import React, { useEffect, useState } from "react";
import axios from "axios";

function TvSeriesTrailers({ tvid }) {
  const [trailerData, setTrailerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tvid) return;

    const fetchTrailers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `http://localhost:5000/api/v1/tvseries/${tvid}/trailers`,
          { withCredentials: true }
        );

        const trailers = response.data?.trailers?.results || [];

        // Pick an official trailer if available, else any trailer
        const selectedTrailer =
          trailers.find((t) => t.type === "Trailer" && t.official) ||
          trailers.find((t) => t.type === "Trailer") ||
          trailers[0];

        setTrailerData(selectedTrailer || null);
      } catch (err) {
        console.error(err);
        setError("Failed to load trailer");
      } finally {
        setLoading(false);
      }
    };

    fetchTrailers();
  }, [tvid]);

  if (loading) return <p className="text-center py-8">Loading trailer...</p>;
  if (error) return <p className="text-center text-red-500 py-8">{error}</p>;
  if (!trailerData)
    return <p className="text-center py-8">No trailer available</p>;

  return (
    <div className="p-8 bg-gradient-to-b from-gray-950 to-black flex justify-center">
      <div className="aspect-video w-full max-w-2xl">
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${trailerData.key}`}
          title={trailerData.name}
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default TvSeriesTrailers;
