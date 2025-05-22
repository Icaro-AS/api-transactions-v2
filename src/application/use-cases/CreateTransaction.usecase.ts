import { BadRequestException } from '@nestjs/common';
import { Transaction } from 'src/domain/entities/Transaction.entity';
import { CreateTransactionInputDTO } from '../dtos/CreateTransactionInputDTO';
import { ITransactionRepository } from 'src/domain/repositories/ITransactionRepository';

export class CreateTransactionUseCase {
  constructor(private readonly repo: ITransactionRepository) {}

  execute(input: CreateTransactionInputDTO) {
    try {
      const transaction = new Transaction(
        input.amount,
        new Date(input.timestamp),
      );

      this.repo.create(transaction);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error instanceof Error) {
        throw new Error(`Error creating transaction: ${error.message}`);
      } else {
        throw new Error('Unknown error occurred while creating transaction');
      }
    }
  }
}
