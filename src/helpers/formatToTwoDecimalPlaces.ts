export function formatToTwoDecimalPlaces(num: number) {
  return num.toFixed(2) as unknown as number;
}

export function formatToUSD(num: number) {
  return `$${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}


export const moneyValidation = (value: string): number => {
  const regex = /^\d+(\.\d{1,2})?$/;
  const isValid = regex.test(value);
  if (!isValid) {
    return -1;
  }
  return parseFloat(value);
};
