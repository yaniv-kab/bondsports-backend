import mongoose from 'mongoose';
import { Transaction, Transactions } from '../models/transaction';

export const getTransactions = async () => {
  const response = await Transactions.find();
  return response;
};

export const createTransaction = async (accountId: mongoose.ObjectId, transactionBody: Transaction) => {
  const transactionToCreate = { ...transactionBody, accountId };
  const newTransaction = await Transactions.create(transactionToCreate);
  return newTransaction;
};