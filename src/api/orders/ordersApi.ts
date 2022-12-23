import { addDoc, collection } from 'firebase/firestore';

import { collections } from 'api/enums';
import { AddOrderPayload } from 'api/orders/types';
import { db } from 'services/firebase';

export const ordersApi = {
  async addOrder(addOrderPayload: AddOrderPayload) {
    const { id } = await addDoc(collection(db, collections.ORDERS), addOrderPayload);

    return id;
  },
};
