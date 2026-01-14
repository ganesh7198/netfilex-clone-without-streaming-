import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import authrouter from "./Routes/auth.route.js";
import movierouter from "./Routes/movie.route.js";
import tvrouter from "./Routes/tv.route.js";
import searchroute from "./Routes/search.routes.js";
import { protectedRoute } from "./Middleware/protectroute.js";
import db from "./DB/db.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Update CORS for production + dev
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://netfilex-clone-without-streaming.onrender.com"
        : "http://localhost:5173", // dev frontend
    credentials: true,
  })
);

// ===== API Routes =====
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/movie", movierouter);
app.use("/api/v1/tvseries", protectedRoute, tvrouter);
app.use("/api/v1/search", protectedRoute, searchroute);

// ===== Optional root API check =====
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ===== Serve React Frontend in Production =====
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");

  // Serve static frontend files
  app.use(express.static(distPath));

  // Catch all other routes and return React index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  db(); // connect MongoDB
  console.log(`Server running on port ${PORT}`);
});
