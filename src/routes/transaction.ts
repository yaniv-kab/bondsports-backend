import { Router } from 'express';
import transactionsController from '../controllers/transaction';
import accountBlocked from '../middlewares/accountBlocked';
import accountExists from '../middlewares/accountExists';

const router = Router();

router.get('/', transactionsController.getTransactions);
router.post('/:accountId', accountExists, accountBlocked, transactionsController.createTransaction);

export default router;