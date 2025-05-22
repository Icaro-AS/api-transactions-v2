export class Transaction {
  constructor(
    public readonly amount: number,
    public readonly timestamp: Date,
  ) {
    if (amount < 0)
      throw new Error('Amount cannot be negative');
    if (timestamp > new Date())
      throw new Error('Timestamp cannot be in the future');
    if (isNaN(timestamp.getTime()))
      throw new Error('Invalid timestamp');
  }
}
