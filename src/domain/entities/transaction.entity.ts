import { BadRequestException } from '@nestjs/common';

export class Transaction {
  constructor(
    public readonly amount: number,
    public readonly timestamp: Date,
  ) {
    if (amount < 0) {
      throw new BadRequestException('Invalid amount');
    }
    if (timestamp > new Date()) {
      throw new BadRequestException('Timestamp cannot be in the future');
    }
    if (isNaN(timestamp.getTime())) {
      throw new BadRequestException('Invalid timestamp format');
    }
  }
}
