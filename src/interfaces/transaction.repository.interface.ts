import { Transaction } from '../../src/domain/entities/Transaction.entity';

export interface TransactionRepository {
  create(transaction: Transaction): Promise<void>;
  getAll(): Promise<Transaction[]>;
  deleteAll(): Promise<void>;
}
