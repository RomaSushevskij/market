import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  startAt,
  updateDoc,
} from 'firebase/firestore';

import { collections } from 'api/enums';
import { AddProductPayload, FetchProductsPayload } from 'api/products/types';
import { db } from 'services/firebase';
import { ProductType } from 'store/reducers';

export const productsAPI = {
  async fetchProducts({ pageSize, currentPage }: FetchProductsPayload) {
    const { size, docs } = await getDocs(collection(db, collections.PRODUCTS));
    const firstProductOfPage = docs[pageSize * currentPage - pageSize];

    const payload = query(
      collection(db, collections.PRODUCTS),
      limit(pageSize),
      startAt(firstProductOfPage),
    );
    const response = await getDocs(payload);
    const products = response.docs.map(doc => {
      const productData = doc.data() as Omit<ProductType, 'id'>;
      const product: ProductType = {
        ...productData,
        id: doc.id,
      };

      return product;
    });

    return { products, productsTotalCount: size };
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
