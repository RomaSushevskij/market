export const formatOrderId = (orderId: string) => {
  const charactersLimit = 6;

  return `${orderId.slice(0, charactersLimit).toUpperCase()}...`;
};
