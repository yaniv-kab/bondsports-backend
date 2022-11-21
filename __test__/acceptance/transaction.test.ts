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

  it('should return the deposit value for the specific account', async () => {
    const accounts = await Accounts.find({});

    const depositExample: Transaction = {
      value: 10000,
    };
    const response = await request(app).post(`/api/v1/transactions/${accounts[0]._id}`).set('Accept', 'application/json').query({ type: 'deposit' }).send(depositExample);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('value');
  });
  it('should failed deposit to account', async () => {
    const accounts = await Accounts.find({});
    const response = await request(app).post(`/api/v1/transactions/${accounts[0]._id}`).set('Accept', 'application/json').query({ type: 'deposit' }).send({});
    expect(response.statusCode).toEqual(400);
  });

  it('should return the withdraw value for the specific account', async () => {
    const accounts = await Accounts.find({});
    const firstAccount = accounts[0];
    const { dailyWithdrawalLimit = 0, balance = 0 } = firstAccount;
    const withdrawExample: Transaction = {
      value: dailyWithdrawalLimit * 0.5,
    };
    const response = await request(app).post(`/api/v1/transactions/${firstAccount._id}`).set('Accept', 'application/json').query({ type: 'withdraw' }).send(withdrawExample);
    if (balance > withdrawExample.value) {
      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('value');
    } else {
      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe(`Sorry, you don't have enough in your balance: ${balance}`);
    }
  });
  it('should return error from withdraw because try to withdraw more than limit', async () => {
    const accounts = await Accounts.find({});
    const firstAccount = accounts[0];
    const { dailyWithdrawalLimit = 0 } = firstAccount;
    const withdrawExample: Transaction = {
      value: dailyWithdrawalLimit * 1.5,
    };
    const response = await request(app).post(`/api/v1/transactions/${firstAccount._id}`).set('Accept', 'application/json').query({ type: 'withdraw' }).send(withdrawExample);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(`Sorry, you can't withdraw more than ${dailyWithdrawalLimit}`);
  });
  it('should failed withdraw to account', async () => {
    const accounts = await Accounts.find({});
    const response = await request(app).post(`/api/v1/transactions/${accounts[0]._id}`).set('Accept', 'application/json').query({ type: 'withdraw' }).send({});
    expect(response.statusCode).toEqual(400);
  });
});