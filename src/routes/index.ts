import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import TransactionRoutes from './transaction';
import accountRoutes from './account';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/transactions', TransactionRoutes);
router.use('/accounts', accountRoutes);

export default router;
