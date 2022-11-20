import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import TransactionRoutes from './transaction';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/transactions', TransactionRoutes);


export default router;
