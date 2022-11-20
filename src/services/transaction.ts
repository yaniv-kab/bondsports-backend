import { Transactions } from '../models/transaction';

export const getTransactions = async () => {
  const response = await Transactions.find();
  return response;
};