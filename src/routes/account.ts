import { Router } from 'express';
import accountController from '../controllers/account';

const router = Router();

router.post('/:personId', accountController.createAccount);
router.get('/:accountId/balance', accountController.getBalance);

export default router;