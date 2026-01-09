
import axios from "axios";

async function moviedetailsservice(id) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/movie/${id}/details`,
      { withCredentials: true }
    );

    if (!response.data.success) {
      return { error: "Cannot load movie details right now" };
    }

    return response.data.details;
  } catch (error) {
    console.log("Error in movie details service", error);
    return { error: "Something went wrong" };
  }
}

export default moviedetailsservice;
