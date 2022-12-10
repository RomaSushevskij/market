export const toDollars = new Intl.NumberFormat('ru', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});
