import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

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
    const { id } = await addDoc(collection(db, collections.PRODUCTS), addProductPayload);

    return id;
  },
  async deleteProduct(productId: string) {
    await deleteDoc(doc(db, collections.PRODUCTS, productId));
  },
  async updateProduct(updateProductPayload: ProductType) {
    const { id, price, title, image } = updateProductPayload;

    await updateDoc(doc(db, collections.PRODUCTS, id), {
      title,
      price,
      image,
    });
  },
};
