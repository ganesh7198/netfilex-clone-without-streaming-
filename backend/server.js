import express from 'express';
import authrouter from './Routes/auth.route.js';
import movierouter from './Routes/movie.route.js';
import dotenv from 'dotenv';
import  db  from './DB/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth",authrouter);
app.use("/api/v1/movie",movierouter);

const port=process.env.PORT
app.listen(port,()=>{
	db();
	console.log(`server listing at http://localhost:${port}`);
})