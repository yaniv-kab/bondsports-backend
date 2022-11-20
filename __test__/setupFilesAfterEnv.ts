import { client } from '../src/db';

global.afterAll(async () => {
  await client.close();
});