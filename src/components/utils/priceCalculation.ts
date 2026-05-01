export const calculatePrice = (quantity: string, unitPrice: string) => {
  const unitPriceInCents = Math.round(parseFloat(unitPrice) * 100);
  const parseQuantity = parseInt(quantity, 10);
  if (!isNaN(unitPriceInCents) && !isNaN(parseQuantity)) {
    return (unitPriceInCents * parseQuantity) / 100;
  }
};
