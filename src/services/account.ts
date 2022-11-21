import mongoose from 'mongoose';
import { Account, Accounts } from '../models/account';

export const createAccount = async (personId: mongoose.ObjectId, accountBody: Account) => {
  const AccountToCreate = {
    ...accountBody,
    personId,
  };
  const account = await Accounts.create(AccountToCreate);
  return account;
};

export const updateAccountBalance = async (accountId: mongoose.ObjectId, depositValue: number) => {
  const account = await Accounts.findById(accountId);
  if (!account) throw new Error('Invalid id sent, no account found!');
  account.balance = (account.balance || 0) + depositValue;

  await Accounts.findByIdAndUpdate(accountId, account);

};
export const getBalance = async (accountId: mongoose.ObjectId) => {
  const account = await Accounts.findById(accountId);
  if (!account) throw new Error('Invalid id sent, no account found!');
  return account.balance;
};