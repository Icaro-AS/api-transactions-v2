import { IsPositive, IsNumber, IsISO8601 } from 'class-validator';

export class Transaction {
    @IsPositive()
    @IsNumber()
    amount: number;

    @IsISO8601()
    timestamp: string;
}