export class CalculateTimeZone {
  private static readonly TIMEZONE_OFFSET = 3 * 60 * 60 * 1000; // UTC-3

  static calculateTimeZone(date: Date): Date {
    const utcDate = new Date(date.getTime() + this.TIMEZONE_OFFSET);
    return utcDate;
  }
}
