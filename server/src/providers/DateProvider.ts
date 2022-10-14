export interface DateProvider {
  millisecondsToUtcDate(milliseconds: number): string
}
