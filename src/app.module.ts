import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { InMemoryTransactionRepository } from './repositories/transaction.repository';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { DeleteAllTransactionsUseCase } from './use-cases/delete-all-transactions.use-case';
import { GetStatisticsUseCase } from './use-cases/get-statistics.use-case';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [
    CreateTransactionUseCase,
    DeleteAllTransactionsUseCase,
    GetStatisticsUseCase,
    {
      provide: 'TransactionRepository',
      useClass: InMemoryTransactionRepository,
    },
  ],
})
export class AppModule {}
