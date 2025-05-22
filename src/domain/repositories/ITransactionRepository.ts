import { Transaction } from '../entities/Transaction.entity';

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<void>;
  getAll(): Promise<Transaction[]>;
  deleteAll(): Promise<void>;
}
