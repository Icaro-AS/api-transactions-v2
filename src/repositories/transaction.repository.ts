import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transaction.entity';
import { TransactionRepository } from '../interfaces/transaction.repository.interface';

@Injectable()
export class InMemoryTransactionRepository implements TransactionRepository {
  private transactions: Transaction[] = [];

  // eslint-disable-next-line @typescript-eslint/require-await
  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async getAll(): Promise<Transaction[]> {
    return this.transactions;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deleteAll(): Promise<void> {
    this.transactions = [];
  }
}
