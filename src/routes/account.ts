import { Router } from 'express';
import accountController from '../controllers/account';
import accountBlocked from '../middlewares/accountBlocked';
import accountExists from '../middlewares/accountExists';

const router = Router();

router.get('/', accountController.getAccounts);
router.post('/:personId', accountController.createAccount);
router.get('/:accountId/balance', accountExists, accountBlocked, accountController.getBalance);
router.post('/:accountId/block', accountExists, accountBlocked, accountController.blockAccount);

export default router;