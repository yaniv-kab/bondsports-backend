import { Router } from 'express';
import accountController from '../controllers/account';

const router = Router();

router.post('/:personId', accountController.createAccount);

export default router;