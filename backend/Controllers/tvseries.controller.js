import { fetchFromTMDB } from "../Services/tmdb.services.js";

// 🔥 Trending TV Series
export const getTrendingSeries = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&sort_by=popularity.desc"
    );

    if (!data?.results?.length) {
      return res.status(404).json({
        success: false,
        message: "No TV series found",
      });
    }

    const randomSeries =
      data.results[Math.floor(Math.random() * data.results.length)];

    res.status(200).json({
      success: true,
      content: randomSeries,
    });
  } catch (error) {
    console.error("Error fetching trending series:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// 🎬 Trailers
export const getTrailers = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos`
    );

    if (!response?.results) {
      return res.status(404).json({
        success: false,
        message: "No trailers found",
      });
    }

    res.status(200).json({
      success: true,
      trailers: response,
    });
  } catch (error) {
    console.error("Error fetching trailers:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// 📄 Details
export const getSeriesDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );

    if (response?.success === false) {
      return res.status(404).json({
        success: false,
        message: "Series not found",
      });
    }

    res.status(200).json({
      success: true,
      details: response,
    });
  } catch (error) {
    console.error("Error fetching details:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// 🔁 Similar Series
export const getSimilarSeries = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );

    res.status(200).json({
      success: true,
      similar: response,
    });
  } catch (error) {
    console.error("Error fetching similar series:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// 📂 Category
export const getSeriesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const allowedCategories = [
      "popular",
      "top_rated",
      "on_the_air",
      "airing_today",
    ];

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }

    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );

    res.status(200).json({
      success: true,
      results: response,
    });
  } catch (error) {
    console.error("Error fetching category:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
