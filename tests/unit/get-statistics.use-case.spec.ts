import { GetStatisticsUseCase } from 'src/application/use-cases/GetStatistics.usecase';
import { TransactionRepository } from 'src/interfaces/transaction.repository.interface';

describe('GetStatisticsUseCase', () => {
  let useCase: GetStatisticsUseCase;
  let transactionRepository: TransactionRepository;
  const utcOffset = 3 * 60 * 60 * 1000;
  const timeStatistics = 60000;

  // Data fixa para os testes
  const fixedNow = new Date('2025-05-14T12:00:00.000Z');

  beforeEach(() => {
    transactionRepository = {
      getAll: jest.fn(),
      create: jest.fn(),
      deleteAll: jest.fn(),
    } as unknown as TransactionRepository;

    useCase = new GetStatisticsUseCase(transactionRepository);

    // Usa fake timers para controlar o "new Date()" interno
    jest.useFakeTimers({ now: fixedNow.getTime() });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('deve retornar zeros quando não houver transações recentes', async () => {
    // Calcula o limite: 60s = timeStatistics considerando utcOffset
    const cutoff = new Date(fixedNow.getTime() - utcOffset - timeStatistics);
    // Cria uma transação anterior ao cutoff
    const oldTransaction = {
      amount: 100,
      timestamp: new Date(cutoff.getTime() - 1000).toISOString(), // 1s antes do cutoff
    };

    (transactionRepository.getAll as jest.Mock).mockResolvedValue([
      oldTransaction,
    ]);

    const stats = await useCase.getStatistics();

    expect(stats).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    });
  });

  it('deve calcular as estatísticas para transações recentes', async () => {
    const cutoff = new Date(fixedNow.getTime() - utcOffset - timeStatistics);
    const transactions = [
      {
        amount: 10,
        timestamp: new Date(cutoff.getTime() + 20000).toISOString(), // 20s após o cutoff
      },
      {
        amount: 20,
        timestamp: new Date(cutoff.getTime() + 40000).toISOString(), // 40s após o cutoff
      },
      {
        amount: 5,
        timestamp: new Date(cutoff.getTime() + 50000).toISOString(), // 50s após o cutoff
      },
    ];
    (transactionRepository.getAll as jest.Mock).mockResolvedValue(transactions);

    const stats = await useCase.getStatistics();

    expect(stats.count).toBe(3);
    expect(stats.sum).toBe(35);
    expect(stats.avg).toBeCloseTo(11.666, 2);
    expect(stats.min).toBe(5);
    expect(stats.max).toBe(20);
  });

  it('deve ignorar transações que estão fora da janela dos 60 segundos', async () => {
    const cutoff = new Date(fixedNow.getTime() - utcOffset - timeStatistics);
    const oldTransaction = {
      amount: 10,
      timestamp: new Date(cutoff.getTime() - 10000).toISOString(), // 10s antes do cutoff
    };
    const recentTransaction = {
      amount: 20,
      timestamp: new Date(cutoff.getTime() + 30000).toISOString(), // 30s após o cutoff
    };

    (transactionRepository.getAll as jest.Mock).mockResolvedValue([
      oldTransaction,
      recentTransaction,
    ]);

    const stats = await useCase.getStatistics();

    expect(stats).toEqual({
      count: 1,
      sum: 20,
      avg: 20,
      min: 20,
      max: 20,
    });
  });
});
