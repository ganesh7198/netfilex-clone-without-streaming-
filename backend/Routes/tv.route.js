import express from "express";
import {
  getTrendingSeries,
  getTrailers,
  getSeriesDetails,
  getSimilarSeries,
  getSeriesByCategory,
} from "../Controllers/tvseries.controller.js";

const router = express.Router();

// 🔥 Trending TV series
router.get("/trendingseries", getTrendingSeries);

// 🎬 Trailers
router.get("/:id/trailers", getTrailers);

// 📄 Series details
router.get("/:id/details", getSeriesDetails);

// 🔁 Similar series
router.get("/:id/similar", getSimilarSeries);

// 📂 Series by category (KEEP THIS LAST)
router.get("/category/:category", getSeriesByCategory);

export default router;
