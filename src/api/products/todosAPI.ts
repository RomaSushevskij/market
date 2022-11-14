import productImage from '../../assets/images/product.png';

import { ProductType } from 'store/reducers';

const productsData: ProductType[] = [
  { id: '1', title: 'Iphone', image: productImage, price: 1000 },
  { id: '2', title: 'Samsung', image: productImage, price: 800 },
  { id: '3', title: 'Huawei', image: productImage, price: 320 },
  { id: '4', title: 'Xiaomi', image: productImage, price: 350 },
  { id: '5', title: 'MacBook Air', image: productImage, price: 1120 },
  { id: '6', title: 'Oppo', image: productImage, price: 375 },
];
const MS = 3000;

export const productsAPI = {
  async fetchProducts() {
    return new Promise<{ data: { products: ProductType[] } }>((res, rej) => {
      const response = {
        data: { products: productsData },
      };

      if (productsData[0].id === '1') {
        setTimeout(res, MS, response);
      } else {
        setTimeout(rej, MS, { message: 'Some error occurred' });
      }
    });
  },
};
