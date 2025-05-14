import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { InMemoryTransactionRepository } from './repositories/transaction.repository';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { DeleteAllTransactionsUseCase } from './use-cases/delete-all-transactions.use-case';
import { GetStatisticsUseCase } from './use-cases/get-statistics.use-case';
import { HealthController } from './health/health.controller';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports: [],
  controllers: [TransactionController, HealthController],
  providers: [
    CreateTransactionUseCase,
    DeleteAllTransactionsUseCase,
    GetStatisticsUseCase,
    Transaction,
    {
      provide: 'TransactionRepository',
      useClass: InMemoryTransactionRepository,
    },
  ],
})
export class AppModule {}
