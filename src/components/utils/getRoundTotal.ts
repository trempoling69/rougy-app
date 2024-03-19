export const getRoundTotal = (quantity: string, unitPrice: string) => {
  const total = parseInt(quantity) * parseFloat(unitPrice);
  return Math.round((total + Number.EPSILON) * 100) / 100;
};

export const getRoundNumber = (number: string | number) => {
  let total;
  if (typeof number === 'string') {
    total = parseFloat(number);
  } else {
    total = number;
  }
  return Math.round((total + Number.EPSILON) * 100) / 100;
};
