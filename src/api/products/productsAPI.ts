import { collection, getDocs } from 'firebase/firestore';

import { db } from 'services/firebase';
import { ProductType } from 'store/reducers';

export const productsAPI = {
  async fetchProducts() {
    const response = await getDocs(collection(db, 'products'));
    const products = response.docs.map(doc => {
      const productData = doc.data() as Omit<ProductType, 'id'>;
      const product: ProductType = {
        ...productData,
        id: doc.id,
      };

      return product;
    });

    return products;
  },
};
