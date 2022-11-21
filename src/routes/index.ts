import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import TransactionRoutes from './transaction';
import accountRoutes from './account';
import personsRoutes from './person';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/transactions', TransactionRoutes);
router.use('/accounts', accountRoutes);
router.use('/persons', personsRoutes);

export default router;
