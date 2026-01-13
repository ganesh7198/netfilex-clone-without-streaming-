import express from "express";
import authrouter from "./Routes/auth.route.js";
import movierouter from "./Routes/movie.route.js";
import tvrouter from "./Routes/tv.route.js";
import searchroute from "./Routes/search.routes.js";
import dotenv from "dotenv";
import db from "./DB/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { protectedRoute } from "./middleware/protectroute.js";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// api routes
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/movie", movierouter);
app.use("/api/v1/tvseries", tvrouter);
app.use("/api/v1/search", protectedRoute, searchroute);

// optional dev route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "frontend/dist");

  app.use(express.static(distPath));

  app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}



const port = process.env.PORT || 5000;
app.listen(port, () => {
  db();
  console.log(`Server listening at http://localhost:${port}`);
});
