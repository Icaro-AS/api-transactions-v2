import { Transaction } from '../entities/transaction.entity';
import { IStatistics } from './IStatistics';

export class StatisticCalculator {
  calculate(transactions: Transaction[]): IStatistics {
    const recent = transactions.filter(
      (t) => Date.now() - t.timestamp.getTime() <= 60000,
    );
    const count = recent.length;
    const sum = recent.reduce((acc, t) => acc + t.amount, 0);
    const min = count ? Math.min(...recent.map((t) => t.amount)) : 0;
    const max = count ? Math.max(...recent.map((t) => t.amount)) : 0;
    const avg = count ? sum / count : 0;
    return { count, sum, avg, min, max };
  }
}
