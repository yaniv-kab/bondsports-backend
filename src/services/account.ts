import { Account, Accounts } from '../models/account';

export const createAccount = async (accountBody: Account) => {
  const account = await Accounts.create(accountBody);
  return account;
};