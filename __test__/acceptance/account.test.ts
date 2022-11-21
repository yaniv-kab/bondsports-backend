import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app';
import { Account, Accounts } from '../../src/models/account';
import { Persons } from '../../src/models/person';

beforeAll(() => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bondsports';
  mongoose.connect(MONGO_URI);

});
describe('POST /api/v1/accounts', () => {
  it('should return the created account for the first user', async () => {
    const persons = await Persons.find();
    const firstPersonId = persons[0]._id;
    const testAccount: Account = {
      balance: 10000,
    };
    const response = await request(app).post(`/api/v1/accounts/${firstPersonId}`).set('Accept', 'application/json').send(testAccount);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('personId');
  });
  it('should failed create account', async () => {
    const response = await request(app).post('/api/v1/accounts/637a7a9194be414b866d852').set('Accept', 'application/json').send({});
    expect(response.statusCode).toEqual(400);
  });
});

describe('GET /api/v1/accounts/:accountId/balance', () => {
  it('should return the balance for the first account', async () => {
    const accounts = await Accounts.find();
    const firstAccountId = accounts[0]._id;
    const response = await request(app).get(`/api/v1/accounts/${firstAccountId}/balance`).set('Accept', 'application/json');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('balance');
  });
  it('should failed get account balance', async () => {
    const response = await request(app).get('/api/v1/accounts/637a3ac0d8e0effabe07e9a0/balance').set('Accept', 'application/json').send({});
    expect(response.statusCode).toEqual(400);
  });
});
describe('POST /api/v1/accounts/:accountId/block', () => {
  it('should block the first account and return success message', async () => {
    const accounts = await Accounts.find();
    const firstAccountId = accounts[0]._id;
    const response = await request(app).post(`/api/v1/accounts/${firstAccountId}/block`).set('Accept', 'application/json');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(`Account ${firstAccountId} Blocked Successfully`);
    // reactivate the first account for next test to pass validation
    accounts[0].activeFlag = true;
    await Accounts.findByIdAndUpdate(firstAccountId, accounts[0]);
  });
  it('should failed block account', async () => {
    const response = await request(app).post('/api/v1/accounts/637a3ac0d8e0effabe07e9a0/block').set('Accept', 'application/json').send({});
    expect(response.statusCode).toEqual(400);
  });
});