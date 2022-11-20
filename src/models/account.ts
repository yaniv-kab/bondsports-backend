import { WithId, ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

export interface Account {
  personId: ObjectId;
  balance: number;
  dailyWithdrawalLimit: number;
  activeFlag: boolean;
  accountType: number;
  createDate: Date
}

export type AccountWithId = WithId<Account>;

const AccountSchema = new Schema<Account>(
  {
    personId: {
      type: Types.ObjectId,
      ref: 'user',
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    dailyWithdrawalLimit: {
      type: Number,
      required: true,
    },
    activeFlag: {
      type: Boolean,
    },
    accountType: {
      type: Number,
    },
    createDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  },
);


export const Accounts = mongoose.model<Account>('account', AccountSchema);