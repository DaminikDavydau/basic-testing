import {
  BankAccount,
  TransferFailedError,
  InsufficientFundsError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    const account = new BankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = new BankAccount(500);
    const withdrawAmount = 1000;
    expect(() => account.withdraw(withdrawAmount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = new BankAccount(500);
    const account2 = new BankAccount(1000);
    const transferAmount = 1000;
    expect(() => account1.transfer(transferAmount, account2)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = new BankAccount(1000);
    const transferAmount = 500;
    expect(() => account.transfer(transferAmount, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const account = new BankAccount(1000);
    const depositAmount = 500;
    const expectedBalance = 1500;
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(expectedBalance);
  });

  test('should withdraw money', () => {
    const account = new BankAccount(1000);
    const withdrawAmount = 500;
    const expectedBalance = 500;
    account.withdraw(withdrawAmount);
    expect(account.getBalance()).toBe(expectedBalance);
  });

  test('should transfer money', () => {
    const account1 = new BankAccount(1000);
    const account2 = new BankAccount(2000);
    const transferAmount = 500;
    const expectedBalance1 = 500;
    const expectedBalance2 = 2500;
    account1.transfer(transferAmount, account2);
    expect(account1.getBalance()).toBe(expectedBalance1);
    expect(account2.getBalance()).toBe(expectedBalance2);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const account = new BankAccount(10);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(1000);
    await account.synchronizeBalance();
    const balance = account.getBalance();
    expect(typeof balance).toBe('number');
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(1000);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
