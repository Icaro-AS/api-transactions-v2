import { InMemoryTransactionRepository } from 'src/repositories/transaction.repository';
import { Transaction } from 'src/entities/transaction.entity';

describe('InMemoryTransactionRepository', () => {
  let transactionRepository: InMemoryTransactionRepository;

  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository();
  });

  it('should create a transaction', async () => {
    const transaction: Transaction = {
      amount: 100,
      timestamp: new Date().toISOString(),
    };

    await transactionRepository.create(transaction);

    const transactions = await transactionRepository.getAll();
    expect(transactions).toContain(transaction);
  });

  it('should get all transactions', async () => {
    const transaction1: Transaction = {
      amount: 100,
      timestamp: new Date().toISOString(),
    };
    const transaction2: Transaction = {
      amount: 200,
      timestamp: new Date().toISOString(),
    };

    await transactionRepository.create(transaction1);
    await transactionRepository.create(transaction2);

    const transactions = await transactionRepository.getAll();
    expect(transactions).toEqual([transaction1, transaction2]);
  });

  it('should delete all transactions', async () => {
    const transaction1: Transaction = {
      amount: 100,
      timestamp: new Date().toISOString(),
    };
    const transaction2: Transaction = {
      amount: 200,
      timestamp: new Date().toISOString(),
    };

    await transactionRepository.create(transaction1);
    await transactionRepository.create(transaction2);

    await transactionRepository.deleteAll();

    const transactions = await transactionRepository.getAll();
    expect(transactions).toEqual([]);
  });
});
