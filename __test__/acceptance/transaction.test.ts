import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app';
import { Accounts } from '../../src/models/account';
import { Persons } from '../../src/models/person';
import { Transaction } from '../../src/models/transaction';


describe('POST /api/v1/transactions', () => {
  beforeAll(async () => {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bondsports';
    mongoose.connect(MONGO_URI);


    const accountsCount = await Accounts.count();
    if (accountsCount === 0) {
      //* create account for tests if there is no accounts
      const persons = await Persons.find();
      const firstPersonId = persons[0]._id;
      const testAccount = {
        balance: 10000,
        personId: firstPersonId,
      };
      await Accounts.create(testAccount);
    }
  });

  it('should return the created transactions for the specific account', async () => {
    const accounts = await Accounts.find({});

    const transactionExample: Transaction = {
      value: 10000,
    };
    const response = await request(app).post(`/api/v1/transactions/${accounts[0]._id}`).set('Accept', 'application/json').send(transactionExample);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('value');
  });
  it('should failed create account', async () => {
    const accounts = await Accounts.find({});
    const response = await request(app).post(`/api/v1/transactions/${accounts[0]._id}`).set('Accept', 'application/json').send({});
    expect(response.statusCode).toEqual(400);
  });
});