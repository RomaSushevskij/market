export type AddProductPayload = {
  title: string;
  price: number;
  image: string;
};

export type FetchProductsPayload = {
  pageSize: number;
  currentPage: number;
};
