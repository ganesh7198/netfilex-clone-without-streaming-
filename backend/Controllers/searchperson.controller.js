import User from "../Models/user.model.js";
import { fetchFromTMDB } from "../Services/tmdb.services.js";

// 🔍 Search Person
export const getSearchedPerson = async (req, res) => {
  try {
    const { query } = req.params;
    const userId = req.user._id;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (!response?.results || response.results.length === 0) {
      return res.status(404).json({ message: "No person found" });
    }

    // ✅ Save search history
    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        searchHistory: {
          query,
          type: "person",
          searchedAt: new Date(),
        },
      },
    });

    res.status(200).json({
      success: true,
      results: response.results,
    });
  } catch (error) {
    console.error("Error in search person API:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🎬 Search Movie
export const getSearchedMovie = async (req, res) => {
  try {
    const { query } = req.params;
    const userId = req.user._id;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (!response?.results || response.results.length === 0) {
      return res.status(404).json({ message: "No movie found" });
    }

    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        searchHistory: {
          query,
          type: "movie",
          searchedAt: new Date(),
        },
      },
    });

    res.status(200).json({
      success: true,
      results: response.results,
    });
  } catch (error) {
    console.error("Error in search movie API:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📺 Search TV Series
export const getSearchedTvSeries = async (req, res) => {
  try {
    const { query } = req.params;
    const userId = req.user._id;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (!response?.results || response.results.length === 0) {
      return res.status(404).json({ message: "No TV series found" });
    }

    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        searchHistory: {
          query,
          type: "tv",
          searchedAt: new Date(),
        },
      },
    });

    res.status(200).json({
      success: true,
      results: response.results,
    });
  } catch (error) {
    console.error("Error in search TV series API:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getSearchHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("searchHistory");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ searchHistory: user.searchHistory });
  } catch (error) {
    console.error("Error in getSearchHistory API:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
