import { Request, Response } from 'express';
import AccountId from '../interfaces/AccountId';
import { Transaction, TransactionWithId } from '../models/transaction';
import * as transactionService from '../services/transaction';
import * as accountService from '../services/account';
import { asyncHandler } from '../utils/asyncHandler';
import mongoose from 'mongoose';

const getTransactions = async (req: Request, res: Response<Transaction[]>) => {
  const transactions = await transactionService.getTransactions();
  res.json(transactions);
};

const createTransaction = async (req: Request<AccountId, TransactionWithId, Transaction>, res: Response<TransactionWithId>) => {
  const accountId: mongoose.ObjectId = req.params.accountId;
  const transaction = req.body;
  const transactions = await transactionService.createTransaction(accountId, transaction);
  await accountService.updateAccountBalance(accountId, transaction.value);
  res.json(transactions);
};

export default {
  getTransactions: asyncHandler(getTransactions),
  createTransaction: asyncHandler(createTransaction),
};