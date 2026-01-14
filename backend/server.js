import express from "express";
import authrouter from "./Routes/auth.route.js";
import movierouter from "./Routes/movie.route.js";
import tvrouter from "./Routes/tv.route.js";
import searchroute from "./Routes/search.routes.js";
import dotenv from "dotenv";
import db from "./DB/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { protectedRoute } from "./Middleware/protectroute.js";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// -------------------- MIDDLEWARE --------------------
app.use(
  cors({
    origin: "http://localhost:5173", // update if needed for frontend
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// -------------------- API ROUTES --------------------
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/movie", movierouter);
app.use("/api/v1/tvseries", protectedRoute, tvrouter);
app.use("/api/v1/search", protectedRoute, searchroute);
// -------------------- PRODUCTION FRONTEND --------------------
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");

  // Serve static files from React build
  app.use(express.static(distPath));

  // Catch-all route to serve index.html for React Router
  app.get("/(.*)/", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// -------------------- DATABASE & SERVER --------------------
const port = process.env.PORT || 5000;
app.listen(port, () => {
  db(); // connect to MongoDB
  console.log(`Server listening at http://localhost:${port}`);
});
