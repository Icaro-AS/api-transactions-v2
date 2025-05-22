import { ITransactionRepository } from 'src/domain/repositories/ITransactionRepository';

export class DeleteAllTransactionsUseCase {
  constructor(private readonly repo: ITransactionRepository) {}

  execute() {
    this.repo.deleteAll();
  }
}
