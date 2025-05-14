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
    // Validate that timestamp is a valid date
    if (isNaN(transactionDate.getTime())) {
      throw new BadRequestException('Invalid timestamp format');
    }

    const now = new Date();
    // Validate that timestamp is not in the future
    if (transactionDate.getTime() > now.getTime()) {
      throw new BadRequestException('Timestamp is in the future');
    }

    // Validate that timestamp is within the last 60 seconds
    if (now.getTime() - transactionDate.getTime() > 60000) {
      throw new BadRequestException('Timestamp older than 60 seconds');
    }

    await this.transactionRepository.create(transaction);
  }
}
