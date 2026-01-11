import React, { useState } from "react";
import TrendingTvSeriesComponent from "../Comopontes/TrendingTvseries";
import TvSeriesDetails from "../Comopontes/TvSeriesDetails";
import TvSeriesTrailers from "../Comopontes/TvSeriesTraliers";

function Tv() {
  const [tvid, setTvid] = useState(null);

  return (
    <>
      <TrendingTvSeriesComponent settvid={setTvid} />

      {tvid ? (
        <TvSeriesDetails tvid={tvid} />
      ) : (
        <p className="text-black p-8 text-center">
          Loading TV series details...
        </p>
      )}
      {tvid ? (
        <TvSeriesTrailers tvid={tvid} />
      ) : (
        <p className="text-black p-8 text-center">
          Loading TV series details...
        </p>
      )}
    </>
  );
}

export default Tv;
