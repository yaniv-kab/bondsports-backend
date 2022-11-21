import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import ErrorResponse from '../interfaces/ErrorResponse';
import { Accounts } from '../models/account';

const accountExists = async (req: Request<any>, res: Response<ErrorResponse>, next: NextFunction): Promise<void> => {
  try {
    const accountId: mongoose.ObjectId = req.params.accountId;
    const account = await Accounts.findById(accountId);
    if (!account) {
      next(new Error('Invalid id sent, no account found!'));
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default accountExists;