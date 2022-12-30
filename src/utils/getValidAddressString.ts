export const getValidAddressString = (
  city: string,
  street: string,
  house: string,
  apartment?: string,
) => {
  return `${city}, st. ${street}, ${house}, ${apartment && `kV. ${apartment}`}`;
};
