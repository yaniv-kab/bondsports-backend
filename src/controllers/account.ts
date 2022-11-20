import { Request, Response } from 'express';
import mongoose from 'mongoose';
import PersonId from '../interfaces/PersonId';
import { Account, AccountWithId } from '../models/account';
import * as accountService from '../services/account';
import { asyncHandler } from '../utils/asyncHandler';

const createAccount = async (req: Request<PersonId, AccountWithId, Account>, res: Response<AccountWithId>) => {
  const personId: mongoose.ObjectId = req.params.personId;
  const accountBody = req.body;
  const account = await accountService.createAccount(personId, accountBody);
  res.json(account);
};

export default {
  createAccount: asyncHandler(createAccount),
};