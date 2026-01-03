import { fetchFromTMDB } from "../Services/tmdb.services.js";



export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
    );

    if (!data?.results || data.results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No movies found",
      });
    }

    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];

    res.status(200).json({
      success: true,
      content: randomMovie,
    });
  } catch (error) {
    console.error("Error fetching trending movie:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getTralerilers=async(req,res)=>{
	try{
		const {id}=req.params;
		const response=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
			if(response.status==404){
			return res.status(404).json({success:false,message:"no movie found"})
		}
		res.status(200).json({success:true, trailers:response.results});

	}catch(error){
        console.log("error in the movie controller js",error.message)
	    res.status(500).json({success:false,message:"internal server error"});
	}
}
export const getMovieDetails=async(req,res)=>{
    try{
		const {id}=req.params;
		const response=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        	if(response.status==404){
			return res.status(404).json({success:false,message:"no movie found"})
		}
		res.status(200).json({success:true, details:response});
		

	}catch(error){
         console.log("error in the movie controller js",error.message)
	    res.status(500).json({success:false,message:"internal server error"});
	}
}
export const getSimilerMovie=async(req,res)=>{
	try{
		const {id}=req.params;
		const response=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
			if(response.status==404){
			return res.status(404).json({success:false,message:"no movie found"})
		}
		res.status(200).json({success:true, similar:response});

	}catch(error){
            console.log("error in the movie controller js",error.message)
	    res.status(500).json({success:false,message:"internal server error"});
	}

}
export const getMovieByCategory=async(req,res)=>{
     const {category}=req.params;
	 try{
		const response=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
          	if(response.status==404){
			return res.status(404).json({success:false,message:"no movie found"})
		}
		res.status(200).json({success:true, category:response});
		
	 }catch(error){
           console.log("error in the movie controller js",error.message)
	    res.status(500).json({success:false,message:"internal server error"});
	 }
}