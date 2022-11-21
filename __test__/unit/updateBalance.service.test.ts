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

  it('should add to the account balance to new balance', async () => {
    const accounts: any = await Accounts.find();
    const firstAccountId = accounts[0]._id;
    await updateAccountBalance(firstAccountId, 2000, 'deposit');
    const updatedAccount = await Accounts.findById(firstAccountId);
    expect(updatedAccount?.balance).toBe(accounts[0]?.balance + 2000);

  });
  it('should subtract from the account balance to new balance', async () => {
    const accounts: any = await Accounts.find();
    const firstAccount = accounts[0];
    const { dailyWithdrawalLimit = 0, balance = 0 } = firstAccount;
    const withdrawValue = dailyWithdrawalLimit * 0.5;

    try {
      await updateAccountBalance(firstAccount._id, withdrawValue, 'withdraw');
    } catch (error: any) {
      console.log(error);
      expect(error.message).toEqual(`Sorry, you don't have enough in your balance: ${balance}`);
      return;
    }
    const updatedAccount = await Accounts.findById(firstAccount._id);
    expect(updatedAccount?.balance).toBe(balance - withdrawValue);

  });
});
