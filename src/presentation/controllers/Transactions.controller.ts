import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateTransactionUseCase } from 'src/application/use-cases/CreateTransaction.usecase';
import { DeleteAllTransactionsUseCase } from 'src/application/use-cases/DeleteAllTransactions.usecase';
import { GetStatisticsUseCase } from 'src/application/use-cases/GetStatistics.usecase';
import { CreateTransactionRequestDTO } from '../dtos/CreateTransactionRequest.dto';
import { CreateTransactionInputDTO } from 'src/application/dtos/CreateTransactionInputDTO';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransaction: CreateTransactionUseCase,
    private readonly deleteAll: DeleteAllTransactionsUseCase,
    private readonly getStatistics: GetStatisticsUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateTransactionRequestDTO) {
    const input: CreateTransactionInputDTO = {
      amount: dto.amount,
      timestamp: new Date(dto.timestamp)
    };
    this.createTransaction.execute(input);
    return { statusCode: 201, message: 'Created' };
  }

  @Delete()
  clear() {
    this.deleteAll.execute();
    return { statusCode: 200, message: 'All transactions cleared' };
  }

  @Get('/statistics')
  get() {
    return this.getStatistics.execute();
  }
}
