import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Transaction } from '../entities/transaction.entity';
import { TransactionRepository } from '../interfaces/transaction.repository.interface';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(transaction: Transaction) {
    const { amount, timestamp } = transaction;
    // Validate that amount is greater than zero
    if (amount <= 0) {
      throw new BadRequestException('Invalid amount');
    }

    const transactionDate = new Date(timestamp);
    if (isNaN(transactionDate.getTime())) {
      throw new BadRequestException('Invalid timestamp format');
    }

    const now = new Date();
    if (transactionDate.getTime() > now.getTime()) {
      throw new BadRequestException('Timestamp is in the future');
    }

    await this.transactionRepository.create(transaction);
  }
}
