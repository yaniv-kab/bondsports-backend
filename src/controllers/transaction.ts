import { Request, Response } from 'express';
import AccountId from '../interfaces/AccountId';
import { Transaction, TransactionWithId } from '../models/transaction';
import * as transactionService from '../services/transaction';
import * as accountService from '../services/account';
import { asyncHandler } from '../utils/asyncHandler';
import mongoose from 'mongoose';
import { CreateTransactionType } from '../interfaces/CreateTransactionType';

const getTransactions = async (req: Request, res: Response<Transaction[]>) => {
  const transactions = await transactionService.getTransactions();
  res.json(transactions);
};

const createTransaction = async (req: Request<AccountId, TransactionWithId, Transaction, CreateTransactionType>, res: Response<TransactionWithId>) => {
  const accountId: mongoose.ObjectId = req.params.accountId;
  const value = req.body.value;
  const { type } = req.query;
  const newTransaction = await transactionService.createTransaction(accountId, value, type);
  await accountService.updateAccountBalance(accountId, value, type);
  res.json(newTransaction);
};

export default {
  getTransactions: asyncHandler(getTransactions),
  createTransaction: asyncHandler(createTransaction),
};