import { Transaction } from 'src/domain/entities/Transaction.entity';
import { CreateTransactionInputDTO } from '../dtos/CreateTransactionInputDTO';
import { ITransactionRepository } from 'src/domain/repositories/ITransactionRepository';

export class CreateTransactionUseCase {
  constructor(private readonly repo: ITransactionRepository) {}

  execute(input: CreateTransactionInputDTO) {
    try {
      const transaction = new Transaction(
        input.amount,
        input.timestamp.slice(0, -1),
      );
      this.repo.create(transaction);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating transaction: ${error.message}`);
      } else {
        throw new Error('Unknown error occurred while creating transaction');
      }
    }
  }
}
