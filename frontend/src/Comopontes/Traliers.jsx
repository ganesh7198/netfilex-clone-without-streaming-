import React, { useEffect, useState } from "react";
import axios from "axios";

function Trailers({ movieid }) {
  const [trailerData, setTrailerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieid) return;

    const fetchTrailers = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:5000/api/v1/movie/${movieid}/tralerilers`,{withCredentials:true}
        );

        const trailers = response.data?.trailers?.results || [];

        const selectedTrailer =
          trailers.find((t) => t.type === "Trailer" && t.official) ||
          trailers.find((t) => t.type === "Trailer") ||
          trailers[0];

        setTrailerData(selectedTrailer || null);
      } catch (err) {
        setError("Failed to load trailer");
      } finally {
        setLoading(false);
      }
    };

    fetchTrailers();
  }, [movieid]);

  if (loading) return <p className="text-center">Loading trailer...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!trailerData) return <p className="text-center">No trailer available</p>;

  return (
    <>
  
      <div className=" p-26 bg-gradient-to-b from-gray-950 to-black my-8 flex justify-center">
        <div className="aspect-video w-full max-w-2xl">
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${trailerData.key}`}
            title={trailerData.name}
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}

export default Trailers;
