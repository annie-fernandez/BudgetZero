export function formatToTwoDecimalPlaces(num: number) {
  return num.toFixed(2) as unknown as number;
}

export function formatToUSD(num: number) {
  return `$${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}
