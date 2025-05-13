import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Transaction } from '../entities/transaction.entity';
import { TransactionRepository } from '../interfaces/transaction.repository.interface';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(transaction: Transaction): Promise<void> {
    if (new Date(transaction.timestamp) > new Date()) {
      throw new BadRequestException(
        'Transaction timestamp cannot be in the future',
      );
    }

    await this.transactionRepository.create(transaction);
  }
}
