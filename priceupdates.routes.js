import express from 'express';
import { priceUpdates,tempPriceUpdates } from '../controllers/priceupdate.controller.js';

const router = express.Router();

router.post('/priceupdates', priceUpdates);
router.get('/temp', tempPriceUpdates);

export default router;