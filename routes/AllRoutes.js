import express from 'express';
import { DailyBonus } from '../controllers/Bonus/DailyBonus.js';
import { LevelIncome } from '../controllers/Bonus/LevelIncome.js';
import { RoyaltyBonus } from '../controllers/Bonus/RoyaltyBonus.js';
import { GiveRoyaltyBonus } from '../controllers/Bonus/GiveRoyaltyBonus.js';
import { Login } from '../controllers/Authentication/Login.js';
import { CreateAccounts } from '../controllers/Test/CreateAccounts.js';

const router = express.Router();

router.post('/DailyBonus', DailyBonus);
router.post('/LevelIncome', LevelIncome);
router.post('/RoyaltyBonus', RoyaltyBonus);
router.post('/GiveRoyaltyBonus', GiveRoyaltyBonus);
router.post('/Login', Login);
router.post('/CreateAccounts', CreateAccounts);

export default router;
