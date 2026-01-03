import express from 'express';
import { getMovieByCategory, getMovieDetails, getSimilerMovie, getTralerilers, getTrendingMovie } from '../Controllers/movie.controller.js';



const router=express.Router();


router.get('/trending',getTrendingMovie);
router.get('/:id/tralerilers',getTralerilers);
router.get('/:id/details',getMovieDetails);
router.get('/:id/similar',getSimilerMovie);
router.get('/:category',getMovieByCategory);



export default router