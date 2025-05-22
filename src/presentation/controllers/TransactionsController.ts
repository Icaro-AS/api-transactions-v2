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
import { DeleteAllTransactionsUseCase } from 'src/application/use-cases/delete-all-transactions.use-case';
import { GetStatisticsUseCase } from 'src/application/use-cases/get-statistics.use-case';
import { CreateTransactionRequestDTO } from '../dtos/CreateTransactionRequest.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransaction: CreateTransactionUseCase,
    private readonly deleteAll: DeleteAllTransactionsUseCase,
    private readonly getStatistics: GetStatisticsUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateTransactionRequestDTO) {
    this.createTransaction.execute(dto);
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
