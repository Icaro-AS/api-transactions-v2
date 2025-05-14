import { Inject, Injectable } from '@nestjs/common';
import { StatisticsDto } from '../dtos/statistics.dto';
import { TransactionRepository } from '../interfaces/transaction.repository.interface';

@Injectable()
export class GetStatisticsUseCase {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async getStatistics(): Promise<StatisticsDto> {
    const now = new Date();
    const utcOffset = 3 * 60 * 60 * 1000;
    const timeStatistics = 60000;
    const sixtySecondsAgo = new Date(
      now.getTime() - utcOffset - timeStatistics,
    ); // 60 segundos

    const transactions = await this.transactionRepository.getAll();

    const recentTransactions = transactions.filter(
      (transaction) => new Date(transaction.timestamp) >= sixtySecondsAgo,
    );

    console.log('transactions:', transactions);
    console.log('Now:', now);
    console.log('sixtySecondsAgo:', sixtySecondsAgo);

    if (recentTransactions.length === 0) {
      return {
        count: 0,
        sum: 0,
        avg: 0,
        min: 0,
        max: 0,
      };
    }

    const sum = recentTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );
    const avg = sum / recentTransactions.length;
    const min = Math.min(
      ...recentTransactions.map((transaction) => transaction.amount),
    );
    const max = Math.max(
      ...recentTransactions.map((transaction) => transaction.amount),
    );

    return {
      count: recentTransactions.length,
      sum,
      avg,
      min,
      max,
    };
  }
}
