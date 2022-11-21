import { Request, Response } from 'express';
import AccountId from '../interfaces/AccountId';
import { Transaction, TransactionWithId } from '../models/transaction';
import * as transactionService from '../services/transaction';
import * as accountService from '../services/account';
import { asyncHandler } from '../utils/asyncHandler';
import mongoose from 'mongoose';
import { CreateTransactionType } from '../interfaces/CreateTransactionType';
import TransactionsPeriod from '../interfaces/TransactionsPeriod';
import moment from 'moment';

const getTransactions = async (req: Request<AccountId, TransactionWithId[], {}, TransactionsPeriod>, res: Response<Transaction[]>) => {
  const accountId: mongoose.ObjectId = req.params.accountId;
  const fromDate = req.query.fromDate ? moment(req.query.fromDate).format('YYYY-MM-DD hh:mm') : moment().startOf('month').format('YYYY-MM-DD hh:mm');
  const toDate = req.query.toDate ? moment(req.query.toDate).format('YYYY-MM-DD hh:mm') : moment().endOf('month').format('YYYY-MM-DD hh:mm');

  const transactions = await transactionService.getTransactions(accountId, fromDate, toDate);
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