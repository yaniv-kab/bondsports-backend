import request from 'supertest';
import app from '../../src/app';

describe('GET /api/v1/transactions', () => {
  it('should return an array of transactions', async () => {
    const response = await request(app).get('/api/v1/transactions');
    expect(response.statusCode).toEqual(200);
  });
});