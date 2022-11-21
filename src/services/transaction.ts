import mongoose from 'mongoose';
import { TypeEnum } from '../interfaces/CreateTransactionType';
import { Transactions } from '../models/transaction';

export const getTransactions = async (accountId: mongoose.ObjectId, fromDate: string, toDate: string) => {
  const response = await Transactions.find({ accountId, createdAt: { $gte: fromDate, $lt: toDate } });
  return response;
};

export const createTransaction = async (accountId: mongoose.ObjectId, value: Number, type: TypeEnum) => {
  value = type === 'withdraw' ? -value : value;
  const transactionToCreate = { value, accountId };
  const newTransaction = await Transactions.create(transactionToCreate);
  return newTransaction;
};