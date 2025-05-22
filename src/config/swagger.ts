import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Transactions API')
  .setDescription('API para registrar e calcular estatísticas de transações')
  .setVersion('1.0')
  .build();
