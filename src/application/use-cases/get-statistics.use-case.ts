import { ITransactionRepository } from 'src/domain/repositories/ITransactionRepository';
import { StatisticCalculator } from 'src/domain/services/StatiscticsCalculatorService';

export class GetStatisticsUseCase {
  constructor(
    private readonly repo: ITransactionRepository,
    private readonly calculator: StatisticCalculator,
  ) {}

  async execute() {
    const transactions = await this.repo.getAll();
    return this.calculator.calculate(transactions);
  }
}
