import mongoose from 'mongoose';
import { Accounts } from '../../src/models/account';
import { Persons } from '../../src/models/person';
import { updateAccountBalance } from '../../src/services/account';
describe('Unit Test update account balance', () => {
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

  it('should update the account balance to new balance', async () => {
    const accounts: any = await Accounts.find();
    const firstAccountId = accounts[0]._id;
    await updateAccountBalance(firstAccountId, 2000);
    const updatedAccount = await Accounts.findById(firstAccountId);
    expect(updatedAccount?.balance).toBe(accounts[0]?.balance + 2000);

  });
});
