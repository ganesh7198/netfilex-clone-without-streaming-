import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const SearchContext = createContext();
export default SearchContext;

export function SearchProvider({children}) {
  const [search, setsearch] = useState(null);
  const nagivate = useNavigate();
  function handlechange(e) {
    setsearch(e.target.value);
  }
  function keydown(e) {
    if (e.key === "Enter") {
      nagivate("/search");
    }
  }
  return (
    <>
      <SearchContext.Provider value={{ search, handlechange, keydown }}>
        {children}
      </SearchContext.Provider>
    </>
  );
}
