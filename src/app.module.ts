import { Module } from '@nestjs/common';
import { TransactionsController } from './presentation/controllers/Transactions.controller';

import { CreateTransactionUseCase } from './application/use-cases/CreateTransaction.usecase';
import { DeleteAllTransactionsUseCase } from './application/use-cases/DeleteAllTransactions.usecase';
import { GetStatisticsUseCase } from './application/use-cases/GetStatistics.usecase';
import { HealthController } from './health/health.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import * as winston from 'winston';
import { LoggerMiddleware } from './presentation/middlewares/logger.middleware';
import { MiddlewareConsumer } from '@nestjs/common';
import { MetricsMiddleware } from './presentation/middlewares/metrics.middleware';
import { StatisticsGateway } from './presentation/gateways/statistics.gateway';
import { InMemoryTransactionRepository } from './infrastructure/repositories/InMemoryTransactionRepository';
import { logger } from './infrastructure/logger/winston.logger';
import { StatisticCalculator } from './domain/services/StatiscticsCalculatorService';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 6000,
          limit: 10,
        },
      ],
    }),
  ],

  controllers: [TransactionsController, HealthController],
  providers: [
    {
      provide: 'TransactionRepository',
      useClass: InMemoryTransactionRepository,
    },
    StatisticCalculator,
    {
      provide: CreateTransactionUseCase,
      useFactory: (repo) => new CreateTransactionUseCase(repo),
      inject: ['TransactionRepository'],
    },
    {
      provide: DeleteAllTransactionsUseCase,
      useFactory: (repo) => new DeleteAllTransactionsUseCase(repo),
      inject: ['TransactionRepository'],
    },
    {
      provide: GetStatisticsUseCase,
      useFactory: (repo, calculator) =>
        new GetStatisticsUseCase(repo, calculator),
      inject: ['TransactionRepository', StatisticCalculator],
    },
    StatisticsGateway,
    {
      provide: 'winston',
      useValue: logger,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(MetricsMiddleware).forRoutes('*');
  }
}
