import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app';
import { Account } from '../../src/models/account';
import { Persons } from '../../src/models/person';

describe('POST /api/v1/accounts', () => {
  beforeEach(() => {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bondsports';
    mongoose.connect(MONGO_URI);

  });
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