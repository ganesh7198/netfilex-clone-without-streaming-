import mongoose from "mongoose";
import User from "../Models/user.model.js";
import { fetchFromTMDB } from "../Services/tmdb.services.js";

/**
 * 🔍 COMMON FUNCTION TO SAVE SEARCH HISTORY
 */
const saveSearchHistory = async ({ userId, item }) => {
  await User.findByIdAndUpdate(userId, {
    $addToSet: {
      searchHistory: {
        tmdbId: item.tmdbId,
        title: item.title,
        image: item.image,
        type: item.type,
        searchedAt: new Date()
      }
    }
  });
};

/**
 * 🔍 SEARCH PERSON
 */
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

    if (!response?.results?.length) {
      return res.status(404).json({ message: "No person found" });
    }

    const person = response.results[0];

    await saveSearchHistory({
      userId,
      item: {
        tmdbId: person.id,
        title: person.name,
        image: person.profile_path,
        type: "person"
      }
    });

    res.status(200).json({ success: true, results: response.results });
  } catch (error) {
    console.error("Error in search person API:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * 🎬 SEARCH MOVIE
 */
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

    if (!response?.results?.length) {
      return res.status(404).json({ message: "No movie found" });
    }

    const movie = response.results[0];

    await saveSearchHistory({
      userId,
      item: {
        tmdbId: movie.id,
        title: movie.title,
        image: movie.poster_path,
        type: "movie"
      }
    });

    res.status(200).json({ success: true, results: response.results });
  } catch (error) {
    console.error("Error in search movie API:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * 📺 SEARCH TV SERIES
 */
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

    if (!response?.results?.length) {
      return res.status(404).json({ message: "No TV series found" });
    }

    const tv = response.results[0];

    await saveSearchHistory({
      userId,
      item: {
        tmdbId: tv.id,
        title: tv.name,
        image: tv.poster_path,
        type: "tv"
      }
    });

    res.status(200).json({ success: true, results: response.results });
  } catch (error) {
    console.error("Error in search TV API:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * 📜 GET SEARCH HISTORY
 */
export const getSearchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("searchHistory");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ searchHistory: user.searchHistory });
  } catch (error) {
    console.error("Error in getSearchHistory API:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * ❌ DELETE SEARCH HISTORY ITEM (BY _id)
 */
export const deleteSearchHistoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!id) {
      return res.status(400).json({ message: "tmdbId is required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          searchHistory: { tmdbId: Number(id) }
        }
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Search history item deleted successfully",
      searchHistory: user.searchHistory
    });
  } catch (error) {
    console.error("Error deleting search history by tmdbId:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

