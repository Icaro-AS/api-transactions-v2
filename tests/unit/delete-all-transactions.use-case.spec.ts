import { DeleteAllTransactionsUseCase } from 'src/application/use-cases/delete-all-transactions.use-case';
import { TransactionRepository } from 'src/interfaces/transaction.repository.interface';

describe('DeleteAllTransactionsUseCase', () => {
  let deleteAllTransactionsUseCase: DeleteAllTransactionsUseCase;
  let transactionRepository: TransactionRepository;

  beforeEach(() => {
    transactionRepository = {
      create: jest.fn(),
      getAll: jest.fn(),
      deleteAll: jest.fn(),
    };
    deleteAllTransactionsUseCase = new DeleteAllTransactionsUseCase(
      transactionRepository,
    );
  });

  it('should delete all transactions', async () => {
    await deleteAllTransactionsUseCase.execute();

    expect(transactionRepository.deleteAll).toHaveBeenCalled();
  });
});
