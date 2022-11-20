import { WithId } from 'mongodb';
import mongoose from 'mongoose';

export interface Person {
  name: string;
  document: string;
  birthDate: Date;
}
export type PersonWithId = WithId<Person>;

const personSchema = new mongoose.Schema<Person>(
  {
    name: {
      type: String,
      required: true,
    },
    document: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


export const Persons = mongoose.model<Person>('person', personSchema);