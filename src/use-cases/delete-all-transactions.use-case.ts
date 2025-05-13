import { Injectable, Inject } from '@nestjs/common';
import { TransactionRepository } from '../interfaces/transaction.repository.interface';

@Injectable()
export class DeleteAllTransactionsUseCase {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(): Promise<void> {
    await this.transactionRepository.deleteAll();
  }
}
