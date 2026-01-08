// Services/SimilarMovieSevices.js
import axios from "axios";

async function SimilarMovieSevices(id) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/movie/${id}/similar`,
      { withCredentials: true }
    );

    if (!response.data.success) {
      return { error: "Server is currently busy" };
    }

    return response.data.similar;
  } catch (error) {
    console.error("Similar movie error:", error.message);
    return { error: "Something went wrong" };
  }
}

export default SimilarMovieSevices;
