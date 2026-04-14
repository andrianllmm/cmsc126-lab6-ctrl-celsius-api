export function toPercent(value: number) {
  return Math.max(0, Math.min(100, Math.round(value * 100)));
}
