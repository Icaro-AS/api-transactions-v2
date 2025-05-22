import { BadRequestException } from '@nestjs/common';

export class Transaction {
  constructor(
    public readonly amount: number,
    public readonly timestamp: string,
  ) {
    const timestampTimeZone = new Date(this.timestamp.slice(0, -1));
    if (amount < 0) {
      throw new BadRequestException('Invalid amount');
    }
    if (timestampTimeZone > new Date()) {
      throw new BadRequestException('Timestamp cannot be in the future');
    }
    if (isNaN(timestampTimeZone.getTime())) {
      throw new BadRequestException('Invalid timestamp format');
    }
  }
}
