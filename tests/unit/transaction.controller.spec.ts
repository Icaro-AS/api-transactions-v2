import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateTransactionDto } from 'src/dtos/create-transaction.dto';
import { StatisticsDto } from 'src/dtos/statistics.dto';
import { Transaction } from 'src/domain/entities/transaction.entity';
import { CreateTransactionUseCase } from 'src/application/use-cases/CreateTransaction.usecase';
import { DeleteAllTransactionsUseCase } from 'src/application/use-cases/DeleteAllTransactions.usecase';
import { GetStatisticsUseCase } from 'src/application/use-cases/GetStatistics.usecase';
import { TransactionController } from 'src/presentation/controllers/Transactions.controller';

describe('TransactionController', () => {
  let controller: TransactionController;
  let createTransactionUseCase: CreateTransactionUseCase;
  let deleteAllTransactionsUseCase: DeleteAllTransactionsUseCase;
  let getStatisticsUseCase: GetStatisticsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: CreateTransactionUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteAllTransactionsUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetStatisticsUseCase,
          useValue: { getStatistics: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    createTransactionUseCase = module.get<CreateTransactionUseCase>(
      CreateTransactionUseCase,
    );
    deleteAllTransactionsUseCase = module.get<DeleteAllTransactionsUseCase>(
      DeleteAllTransactionsUseCase,
    );
    getStatisticsUseCase =
      module.get<GetStatisticsUseCase>(GetStatisticsUseCase);
  });

  describe('create', () => {
    const validDto: CreateTransactionDto = {
      // preencha com as propriedades válidas para CreateTransactionDto
      amount: 100,
      timestamp: new Date().toISOString(),
    };

    it('deve criar uma transação quando os dados são válidos', async () => {
      // Simula retorno vazio na validação (sem erros)
      jest.spyOn(require('class-validator'), 'validate').mockResolvedValue([]);

      await controller.create(validDto);

      // Espera que o use-case de criação seja chamado com a entidade transformada
      expect(createTransactionUseCase.execute).toHaveBeenCalledWith(
        plainToClass(Transaction, validDto),
      );
    });

    it('deve lançar BadRequestException quando a validação falha', async () => {
      const errors = [
        {
          property: 'amount',
          constraints: { isNumber: 'amount must be a number' },
        },
      ];
      jest
        .spyOn(require('class-validator'), 'validate')
        .mockResolvedValue(errors);

      await expect(controller.create(validDto)).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });
  });

  describe('deleteAll', () => {
    it('deve chamar o use-case para deletar todas as transações', async () => {
      await controller.deleteAll();

      expect(deleteAllTransactionsUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('getStatistics', () => {
    it('deve retornar as estatísticas conforme obtidas pelo use-case', async () => {
      const mockStatistics: StatisticsDto = {
        count: 2,
        sum: 300,
        avg: 150,
        min: 100,
        max: 200,
      };
      (getStatisticsUseCase.getStatistics as jest.Mock).mockResolvedValue(
        mockStatistics,
      );

      const result = await controller.getStatistics();

      expect(result).toEqual(mockStatistics);
      expect(getStatisticsUseCase.getStatistics).toHaveBeenCalled();
    });
  });
});
