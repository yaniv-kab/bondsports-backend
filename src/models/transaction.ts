import { WithId, ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

export interface Transaction {
  accountId?: ObjectId;
  value: number;
}

export type TransactionWithId = WithId<Transaction>;

const TransactionSchema = new Schema<Transaction>(
  {
    accountId: {
      type: Types.ObjectId,
      ref: 'accounts',
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


export const Transactions = mongoose.model<Transaction>('transactions', TransactionSchema);