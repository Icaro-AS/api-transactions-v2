import { IsPositive, IsNumber } from 'class-validator';

export class StatisticsDto {
  @IsNumber()
  @IsPositive()
  count: number;

  @IsNumber()
  @IsPositive()
  sum: number;

  @IsNumber()
  @IsPositive()
  avg: number;

  @IsNumber()
  @IsPositive()
  min: number;

  @IsNumber()
  @IsPositive()
  max: number;
}
