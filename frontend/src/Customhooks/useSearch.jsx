import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
function useSearch(){
	const nagivate=useNavigate();
	const[search,setsearch]=useState('')
	function handlechange(e){
        setsearch(e.target.value);
	}
	function keydown(e){
      if (e.key === "Enter") {
		console.log(search);
		nagivate('/search')

      }
	}


	
return {search,setsearch,handlechange,keydown}
}

export default useSearch