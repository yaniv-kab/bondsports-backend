import request from 'supertest';
import app from '../../src/app';
import { Account } from '../../src/models/account';
import { Persons } from '../../src/models/person';

describe('POST /api/v1/accounts', () => {
  it('should return the created account for the first user', async () => {
    Persons.find({}).then((persons) => {
      console.log(persons[0]);
      const testAccount: Account = {
        personId: persons[0]._id,
        balance: 10000,
      };
      request(app).post('/api/v1/accounts').set('Accept', 'application/json').send(testAccount).then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('personId');
      });
    });
  });
});