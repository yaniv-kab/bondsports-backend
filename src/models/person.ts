import { WithId } from 'mongodb';
import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface Person {
  name: string;
  document: string;
  birthDate: Date;
}
export type PersonWithId = WithId<Person>;

const PersonSchema = new Schema<Person>(
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
    collection: 'persons',
  },
);


export const Persons = mongoose.model<Person>('persons', PersonSchema);