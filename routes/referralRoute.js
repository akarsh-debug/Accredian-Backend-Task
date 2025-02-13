import { Router } from 'express'
import { createReferral } from '../controllers/referralController.js';

const router = Router();

router.post("/referral", createReferral);

export default router;