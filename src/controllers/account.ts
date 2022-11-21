import { Request, Response } from 'express';
import mongoose from 'mongoose';
import PersonId from '../interfaces/PersonId';
import AccountId from '../interfaces/AccountId';
import { Account, AccountWithId } from '../models/account';
import * as accountService from '../services/account';
import { asyncHandler } from '../utils/asyncHandler';

const createAccount = async (req: Request<PersonId, AccountWithId, Account>, res: Response<AccountWithId>) => {
  const personId: mongoose.ObjectId = req.params.personId;
  const accountBody = req.body;
  const account = await accountService.createAccount(personId, accountBody);
  res.json(account);
};
const getBalance = async (req: Request<AccountId>, res: Response) => {
  const accountId: mongoose.ObjectId = req.params.accountId;
  const balance = await accountService.getBalance(accountId);
  res.json({ balance });
};

export default {
  createAccount: asyncHandler(createAccount),
  getBalance: asyncHandler(getBalance),
};