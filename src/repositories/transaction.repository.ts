import { Injectable } from "@nestjs/common";
import { Transaction } from '../entities/transaction.entity';
import { TransactionRepository } from '../interfaces/transaction.repository.interface';

@Injectable()
export class InMemoryTransactionRepository implements TransactionRepository {
    private transactions: Transaction[] = [];

    async create(transaction: Transaction): Promise<void> {
        this.transactions.push(transaction);
    }

    async getALl(): Promise<Transaction[]> {
        return this.transactions;
    }

    async deleteAll(): Promise<void> {
        this.transactions = [];
    }
   

}   