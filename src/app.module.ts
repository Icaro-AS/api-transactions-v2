import { Module } from '@nestjs/common';
import { TransactionsController } from './presentation/controllers/TransactionsController';

import { CreateTransactionUseCase } from './application/use-cases/CreateTransaction.usecase';
import { DeleteAllTransactionsUseCase } from './application/use-cases/delete-all-transactions.use-case';
import { GetStatisticsUseCase } from './application/use-cases/get-statistics.use-case';
import { HealthController } from './health/health.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { LoggerMiddleware } from './presentation/middlewares/logger.middleware';
import { MiddlewareConsumer } from '@nestjs/common';
import { MetricsMiddleware } from './presentation/middlewares/metrics.middleware';
import { StatisticsGateway } from './presentation/gateways/statistics.gateway';
import { InMemoryTransactionRepository } from './infrastructure/repositories/InMemoryTransactionRepository';

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
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.simple(),
            winston.format.colorize({ all: true }),
          ),
        }),
      ],
    }),
  ],

  controllers: [TransactionsController, HealthController],
  providers: [
    CreateTransactionUseCase,
    DeleteAllTransactionsUseCase,
    GetStatisticsUseCase,
    {
      provide: 'TransactionRepository',
      useClass: InMemoryTransactionRepository,
    },
    StatisticsGateway,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(MetricsMiddleware).forRoutes('*');
  }
}
