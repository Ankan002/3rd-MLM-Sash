import express from 'express';
import { DailyBonus } from '../controllers/Bonus/DailyBonus.js';
import { Login } from '../controllers/Authentication/Login.js';

const router = express.Router();

router.post('/DailyBonus', DailyBonus);
router.post('/Login', Login);

export default router;
