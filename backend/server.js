import express from 'express';
import authrouter from './Routes/auth.route.js';
import movierouter from './Routes/movie.route.js';
import tvrouter from './Routes/tv.route.js'
import searchroute from './Routes/search.routes.js'
import dotenv from 'dotenv';
import  db  from './DB/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { protectedRoute } from './middleware/protectroute.js';

dotenv.config();
const app=express();
app.use(
  cors({
    origin: "http://localhost:5173", //  frontend URL
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth",authrouter);
app.use("/api/v1/movie",movierouter);
app.use("/api/v1/tvseries",tvrouter);
app.use("/api/v1/search",protectedRoute,searchroute)
const port=process.env.PORT
app.listen(port,()=>{
	db();
	console.log(`server listing at http://localhost:${port}`);
})