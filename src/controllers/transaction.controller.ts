import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { StatisticsDto } from 'src/dtos/statistics.dto';
import { GetStatisticsUseCase } from 'src/use-cases/get-statistics.use-case';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionUseCase } from '../use-cases/create-transaction.use-case';
import { DeleteAllTransactionsUseCase } from '../use-cases/delete-all-transactions.use-case';
import { CreateTransactionDto } from './../dtos/create-transaction.dto';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(
    @Inject(CreateTransactionUseCase)
    private readonly createTransactionUseCase: CreateTransactionUseCase,

    @Inject(DeleteAllTransactionsUseCase)
    private readonly deleteAllTransactionsUseCase: DeleteAllTransactionsUseCase,

    @Inject(GetStatisticsUseCase)
    private readonly getStatisticsUseCase: GetStatisticsUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Transação criada com sucesso.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
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
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Todas as transações foram deletadas.' })
  async deleteAll(): Promise<void> {
    await this.deleteAllTransactionsUseCase.execute();
  }

  @Get('statistics')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Estatísticas retornadas com sucesso.',
    type: StatisticsDto,
  })
  async getStatistics(): Promise<StatisticsDto> {
    return this.getStatisticsUseCase.getStatistics();
  }
}
