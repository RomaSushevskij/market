import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { collections } from 'api/enums';
import { AddOrderPayload, UpdateOrderStatusPayload } from 'api/orders/types';
import { db } from 'services/firebase';
import { AdminOrder } from 'store/reducers/adminOrdersPanel/types';

export const ordersApi = {
  async fetchOrders(userId: string | undefined) {
    let q;

    if (!userId) {
      q = query(collection(db, collections.ORDERS));
    } else {
      q = query(collection(db, collections.ORDERS), where('uid', '==', userId));
    }
    const response = await getDocs(q);

    const orders = response.docs.map(doc => {
      const orderData = doc.data() as AdminOrder;
      const order: AdminOrder = {
        ...orderData,
        orderId: doc.id,
      };

      return order;
    });

    return orders;
  },
  async addOrder(addOrderPayload: AddOrderPayload) {
    const { id } = await addDoc(collection(db, collections.ORDERS), addOrderPayload);

    return id;
  },
  async editOrderStatus(updateOrderStatusPayload: UpdateOrderStatusPayload) {
    const { orderStatus, orderId } = updateOrderStatusPayload;
    const { description } = orderStatus;

    await updateDoc(doc(db, collections.ORDERS, orderId), {
      orderStatus: {
        ...orderStatus,
        description: description || '',
      },
    });
  },
  async deleteOrder(orderId: string) {
    await deleteDoc(doc(db, collections.ORDERS, orderId));
  },
};
