import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { CreateTransactionDto } from 'src/dtos/create-transaction.dto';

describe('TransactionController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await request(app.getHttpServer()).delete('/transactions').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/transactions (POST) - deve criar uma transação válida e retornar 201', async () => {
    const createTransactionDto: CreateTransactionDto = {
      amount: 100,
      timestamp: new Date().toISOString(),
    };

    await request(app.getHttpServer())
      .post('/transactions')
      .send(createTransactionDto)
      .expect(201);
  });

  it('/transactions (POST) - deve retornar 400 para transação com timestamp no futuro', async () => {
    const createTransactionDto: CreateTransactionDto = {
      amount: 100,
      timestamp: new Date(Date.now() + 60000).toISOString(),
    };

    await request(app.getHttpServer())
      .post('/transactions')
      .send(createTransactionDto)
      .expect(400);
  });

  it('/transactions/statistics (GET) - sem transações, estatísticas retornam zeros', async () => {
    const response = await request(app.getHttpServer())
      .get('/transactions/statistics')
      .expect(200);

    expect(response.body).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    });
  });

  it('/transactions/statistics (GET) - deve calcular estatísticas corretamente', async () => {
    const now = new Date();
    const transactions: CreateTransactionDto[] = [
      {
        amount: 10,
        timestamp: new Date(now.getTime() - 10000).toISOString(),
      },
      {
        amount: 20,
        timestamp: new Date(now.getTime() - 20000).toISOString(),
      },
      {
        amount: 5,
        timestamp: new Date(now.getTime() - 30000).toISOString(),
      },
    ];

    for (const dto of transactions) {
      await request(app.getHttpServer())
        .post('/transactions')
        .send(dto)
        .expect(201);
    }

    const response = await request(app.getHttpServer())
      .get('/transactions/statistics')
      .expect(200);

    const expectedStats = {
      count: 3,
      sum: 35,
      avg: 35 / 3,
      min: 5,
      max: 20,
    };

    expect(response.body.count).toBe(expectedStats.count);
    expect(response.body.sum).toBe(expectedStats.sum);
    expect(response.body.avg).toBeCloseTo(expectedStats.avg, 2);
    expect(response.body.min).toBe(expectedStats.min);
    expect(response.body.max).toBe(expectedStats.max);
  });

  it('/transactions (DELETE) - deve deletar todas as transações e limpar as estatísticas', async () => {
    const now = new Date();
    const transactions: CreateTransactionDto[] = [
      {
        amount: 15,
        timestamp: new Date(now.getTime() - 15000).toISOString(), // 15 segundos atrás
      },
      {
        amount: 25,
        timestamp: new Date(now.getTime() - 25000).toISOString(), // 25 segundos atrás
      },
    ];

    for (const dto of transactions) {
      await request(app.getHttpServer())
        .post('/transactions')
        .send(dto)
        .expect(201);
    }

    await request(app.getHttpServer()).delete('/transactions').expect(200);

    const response = await request(app.getHttpServer())
      .get('/transactions/statistics')
      .expect(200);

    expect(response.body).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    });
  });
});
