import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionUseCase } from '../use-cases/create-transaction.use-case';
import { DeleteAllTransactionsUseCase } from '../use-cases/delete-all-transactions.use-case';
import { CreateTransactionDto } from './../dtos/create-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(
    @Inject(CreateTransactionUseCase)
    private readonly createTransactionUseCase: CreateTransactionUseCase,

    @Inject(DeleteAllTransactionsUseCase)
    private readonly deleteAllTransactionsUseCase: DeleteAllTransactionsUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<void> {
    const transaction = plainToClass(Transaction, createTransactionDto);
    const errors = await validate(transaction);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    await this.createTransactionUseCase.execute(transaction);
  }

  @Delete()
  async deleteAll(): Promise<void> {
    await this.deleteAllTransactionsUseCase.execute();
  }
}
