import React, { useState } from "react";
import InnerHomeTrendingMovie from "./InnerHomeTrendingMovie";
import MovieDetails from "../Comopontes/MovieDetails";
import HorizontalMovieRow from "../Comopontes/HorizontalMovieRow";
import Trailers from "../Comopontes/Traliers";

function Innerhomepage() {
  const [movieid, setmovieid] = useState(null);

  return (
    <>
      <InnerHomeTrendingMovie setmovieid={setmovieid} />

      {!movieid ? (
        <div className="p-10 text-center text-gray-400 animate-pulse">
          Loading movie details...
        </div>
      ) : (
        <>
          <MovieDetails movieid={movieid} />
          <Trailers movieid={movieid} />
          <HorizontalMovieRow movieid={movieid} />
        </>
      )}
    </>
  );
}

export default Innerhomepage;
