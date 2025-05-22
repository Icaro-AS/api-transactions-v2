import { CreateTransactionUseCase } from 'src/application/use-cases/CreateTransaction.usecase';
import { TransactionRepository } from 'src/interfaces/transaction.repository.interface';
import { Transaction } from 'src/domain/entities/transaction.entity';
import { BadRequestException } from '@nestjs/common';

describe('CreateTransactionUseCase', () => {
  let createTransactionUseCase: CreateTransactionUseCase;
  let transactionRepository: TransactionRepository;

  beforeEach(() => {
    transactionRepository = {
      create: jest.fn().mockResolvedValue(undefined),
      getAll: jest.fn(),
      deleteAll: jest.fn(),
    };

    createTransactionUseCase = new CreateTransactionUseCase(
      transactionRepository,
    );
  });

  it('should create a transaction with valid data', async () => {
    const transaction: Transaction = {
      amount: 100,
      timestamp: new Date().toISOString(),
    };

    await createTransactionUseCase.execute(transaction);

    expect(transactionRepository.create).toHaveBeenCalledWith(transaction);
  });

  it('should throw BadRequestException for invalid timestamp', async () => {
    const transaction: Transaction = {
      amount: 100,
      timestamp: 'invalid-timestamp',
    };

    await expect(createTransactionUseCase.execute(transaction)).rejects.toThrow(
      BadRequestException,
    );
    expect(transactionRepository.create).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException for timestamp in the future', async () => {
    const futureDate = new Date();
    futureDate.setMinutes(futureDate.getMinutes() + 5);

    const transaction: Transaction = {
      amount: 100,
      timestamp: futureDate.toISOString(),
    };

    await expect(createTransactionUseCase.execute(transaction)).rejects.toThrow(
      BadRequestException,
    );
    expect(transactionRepository.create).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException for negative amount', async () => {
    const transaction: Transaction = {
      amount: -100,
      timestamp: new Date().toISOString(),
    };

    await expect(createTransactionUseCase.execute(transaction)).rejects.toThrow(
      BadRequestException,
    );
    expect(transactionRepository.create).not.toHaveBeenCalled();
  });

  it('should throw BadRequestException for zero amount', async () => {
    const transaction: Transaction = {
      amount: 0,
      timestamp: new Date().toISOString(),
    };

    await expect(createTransactionUseCase.execute(transaction)).rejects.toThrow(
      BadRequestException,
    );
    expect(transactionRepository.create).not.toHaveBeenCalled();
  });
});
