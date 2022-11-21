import mongoose from 'mongoose';
import { TypeEnum } from '../interfaces/CreateTransactionType';
import { Account, Accounts } from '../models/account';

export const getAccounts = async () => {
  const accounts = await Accounts.find();
  return accounts;
};
export const createAccount = async (personId: mongoose.ObjectId, accountBody: Account) => {
  const AccountToCreate = {
    ...accountBody,
    personId,
  };
  const account = await Accounts.create(AccountToCreate);
  return account;
};

export const updateAccountBalance = async (accountId: mongoose.ObjectId, value: number, type: TypeEnum) => {
  const account = await Accounts.findById(accountId);
  if (!account) throw new Error('Invalid id sent, no account found!');

  const { dailyWithdrawalLimit, balance } = account;
  if (type === 'deposit') {
    account.balance = (balance || 0) + value;
  } else {
    if (value > (dailyWithdrawalLimit || 0)) throw new Error(`Sorry, you can't withdraw more than ${dailyWithdrawalLimit}`);
    if (value > (balance || 0)) throw new Error(`Sorry, you don't have enough in your balance: ${balance}`);
    account.balance = (balance || 0) - value;
  }

  await Accounts.findByIdAndUpdate(accountId, account);

};
export const getBalance = async (accountId: mongoose.ObjectId) => {
  const account = await Accounts.findById(accountId);
  if (!account) throw new Error('Invalid id sent, no account found!');
  return account.balance;
};
export const blockAccount = async (accountId: mongoose.ObjectId) => {
  const account = await Accounts.findById(accountId);
  if (!account) throw new Error('Invalid id sent, no account found!');
  account.activeFlag = false;
  await Accounts.findByIdAndUpdate(accountId, account);
};