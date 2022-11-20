import { Router } from 'express';
import transactionsController from '../controllers/transaction';

const router = Router();

router.get('/', transactionsController.getTransactions);
router.post('/:accountId', transactionsController.createTransaction);

export default router;