import express from 'express'
import { getSearchedMovie, getSearchedPerson, getSearchedTvSeries,  getSearchHistory } from '../Controllers/searchperson.controller.js';

const router=express.Router();

router.get('/person/:query',getSearchedPerson)
router.get('/movie/:query',getSearchedMovie)
router.get('/tvseries/:query',getSearchedTvSeries)
router.get('/history', getSearchHistory)


export default router