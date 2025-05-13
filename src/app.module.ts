import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { InMemoryTransactionRepository } from './repositories/transaction.repository';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { DeleteAllTransactionsUseCase } from './use-cases/delete-all-transactions.use-case';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [
    CreateTransactionUseCase,
    DeleteAllTransactionsUseCase,
    {
      provide: 'TransactionRepository',
      useClass: InMemoryTransactionRepository,
    },
  ],
})
export class AppModule {}
