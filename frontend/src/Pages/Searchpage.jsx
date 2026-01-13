import React from "react";
import TvSearch from "../Comopontes/TvSearch";
import { useContext } from "react";
import SearchContext from "../Context/SearchContext";
import MovieSearch from "../Comopontes/MovieSearch";


function Searchpage(){
    const { search } = useContext(SearchContext);
	  return (
      <>
        {search != "" ? <TvSearch search={search}></TvSearch> : <p></p>}
        {search != "" ? <MovieSearch search={search}></MovieSearch> : <p></p>}
      </>
    );
}

export default Searchpage;