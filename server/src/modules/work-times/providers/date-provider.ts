export interface DateProvider {
  millisecondsToUtcDate(milliseconds: number): Date
}
