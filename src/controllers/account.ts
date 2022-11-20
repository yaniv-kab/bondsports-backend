import { Request, Response } from 'express';
import { Account, AccountWithId } from '../models/account';
import * as accountService from '../services/account';
import { asyncHandler } from '../utils/asyncHandler';

const getTransactions = async (req: Request<{}, AccountWithId, Account>, res: Response<AccountWithId>) => {
  const account = await accountService.createAccount(req.body);
  res.json(account);
};

export default {
  getTransactions: asyncHandler(getTransactions),
};