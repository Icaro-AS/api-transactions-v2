import { Transaction } from '../entities/transaction.entity';

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<void>;
  getAll(): Promise<Transaction[]>;
  deleteAll(): Promise<void>;
}
