import { IsNotEmpty, IsNumber, IsISO8601, Min } from 'class-validator';

export class CreateTransactionRequestDTO {
  @IsNumber()
  @Min(0)
  amount!: number;

  @IsISO8601()
  @IsNotEmpty()
  timestamp!: string;
}
