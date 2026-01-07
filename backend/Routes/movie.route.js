import express from 'express';
import { getMovieByCategory, getMovieDetails, getSimilerMovie, getTralerilers, getTrendingMovie } from '../Controllers/movie.controller.js';
import { protectedRoute } from '../Middleware/protectroute.js';



const router=express.Router();


router.get('/trending',getTrendingMovie);
router.get('/:id/tralerilers',protectedRoute,getTralerilers);
router.get('/:id/details',protectedRoute,getMovieDetails);
router.get('/:id/similar',protectedRoute,getSimilerMovie);
router.get('/:category',protectedRoute,getMovieByCategory);




export default router