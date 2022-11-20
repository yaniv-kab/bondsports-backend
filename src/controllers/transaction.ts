import { Request, Response } from 'express';
import { Transaction } from '../models/transaction';
import * as transactionService from '../services/transaction';
import { asyncHandler } from '../utils/asyncHandler';

const getTransactions = async (req: Request, res: Response<Transaction[]>) => {
  const transactions = await transactionService.getTransactions();
  res.json(transactions);
};

export default {
  getTransactions: asyncHandler(getTransactions),
};