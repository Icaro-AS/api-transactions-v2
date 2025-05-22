import { Transaction } from '../entities/Transaction.entity';
import { IStatistics } from './IStatistics';
import { CalculateTimeZone } from './CalculateTimeZone.Service';

export class StatisticCalculator {
  calculate(transactions: Transaction[]): IStatistics {
    const recentTransactions = transactions.filter(
      (transaction) =>
        Date.now() -
          CalculateTimeZone.calculateTimeZone(
            transaction.timestamp,
          ).getTime() <=
        60000,
    );
    const count = recentTransactions.length;
    const sum = recentTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    );
    const min = count
      ? Math.min(...recentTransactions.map((transaction) => transaction.amount))
      : 0;
    const max = count
      ? Math.max(...recentTransactions.map((transaction) => transaction.amount))
      : 0;
    const avg = count ? sum / count : 0;
    return { count, sum, avg, min, max };
  }
}
