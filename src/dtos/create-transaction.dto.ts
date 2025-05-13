import { IsPositive, IsNumber, IsISO8601 } from 'class-validator';

export class CreateTransactionDto {
  @IsPositive()
  @IsNumber()
  amount: number;

  @IsISO8601()
  timestamp: string;
}
