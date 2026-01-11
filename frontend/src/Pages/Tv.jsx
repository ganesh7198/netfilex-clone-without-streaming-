import React, { useState } from "react";
import TrendingTvSeriesComponent from '../Comopontes/TrendingTvseries';
import TvSeriesDetails from "../Comopontes/TvSeriesDetails";

function Tv() {
  const [tvid, setTvid] = useState(null);

  return (
    <>
      {/* Trending TV Hero */}
      <TrendingTvSeriesComponent settvid={setTvid} />

      {/* Details Section */}
      {!tvid ? (
        <p className="text-black p-8 text-center">
          Loading TV series details...
        </p>
      ) : (
        <TvSeriesDetails tvid={tvid} />
      )}
    </>
  );
}

export default Tv;
