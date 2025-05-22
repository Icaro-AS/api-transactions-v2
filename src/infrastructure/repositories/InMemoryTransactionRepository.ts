import { Transaction } from 'src/domain/entities/Transaction.entity';
import { ITransactionRepository } from 'src/domain/repositories/ITransactionRepository';

export class InMemoryTransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [];

  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }

  async deleteAll(): Promise<void> {
    this.transactions = [];
  }

  async getAll(): Promise<Transaction[]> {
    return [...this.transactions];
  }
}
