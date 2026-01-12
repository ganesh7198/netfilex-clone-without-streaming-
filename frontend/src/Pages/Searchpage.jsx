import React from "react";
import useSearch from "../Customhooks/useSearch";
import TvSearch from "../Comopontes/TvSearch";

function Searchpage(){
      const {search}=useSearch();
	  return (
      <>{search != "" ? <TvSearch search={search}></TvSearch> : <p></p>}</>
    );
}

export default Searchpage;