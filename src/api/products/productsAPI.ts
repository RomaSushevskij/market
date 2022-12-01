import { collection, getDocs, addDoc } from 'firebase/firestore';

import { collections } from 'api/enums';
import { AddProductPayload } from 'api/products/types';
import { db } from 'services/firebase';
import { ProductType } from 'store/reducers';

export const productsAPI = {
  async fetchProducts() {
    const response = await getDocs(collection(db, collections.PRODUCTS));
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
  async addProduct(addProductPayload: AddProductPayload) {
    const response = await addDoc(
      collection(db, collections.PRODUCTS),
      addProductPayload,
    );

    console.log(response);
  },
};
