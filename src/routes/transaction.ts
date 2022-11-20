import { Router } from 'express';
import transactionsController from '../controllers/transaction';

const router = Router();

router.get('/', transactionsController.getTransactions);

export default router;