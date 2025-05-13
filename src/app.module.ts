import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { InMemoryTransactionRepository } from './repositories/transaction.repository';
import { TransactionRepository } from './interfaces/transaction.repository.interface';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { TransactionController } from './controllers/transaction.controller';
import { create } from 'domain';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers:[
    CreateTransactionUseCase,
    {
      provide: 'TransactionRepository',
      useClass: InMemoryTransactionRepository,
    },
    
  ]
})
export class AppModule {}
