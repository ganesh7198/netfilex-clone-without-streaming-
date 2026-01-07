import axios from "axios";

async function TrendingMovieServices() {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/movie/trending"
    );

    if (!response.data.success) {
      return { error: "Server is currently busy" };
    }

    return response.data.content;
  } catch (error) {
    console.error("Error in trending movie services:", error.message);
    return { error: "Something went wrong" };
  }
}

export default TrendingMovieServices;
