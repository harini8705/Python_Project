import express from 'express';
import { scrapeSchemes } from '../controllers/scheme.controller.js';

const router = express.Router();

router.get('/schemes', scrapeSchemes);

export default router;