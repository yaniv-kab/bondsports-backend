import { Router } from 'express';
import accountController from '../controllers/account';

const router = Router();

router.post('/', accountController.getTransactions);

export default router;