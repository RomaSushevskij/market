import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  updateDoc,
  where,
} from 'firebase/firestore';

import { collections } from 'api/enums';
import {
  AddOrderPayload,
  FetchOrdersPayload,
  UpdateOrderStatusPayload,
} from 'api/orders/types';
import { db } from 'services/firebase';
import { AdminOrder } from 'store/reducers/adminOrdersPanel/types';

export const ordersApi = {
  async fetchOrders({ pageSize, currentPage, userId }: FetchOrdersPayload) {
    const q = query(collection(db, collections.ORDERS), orderBy('orderDate', 'desc'));
    const { docs } = await getDocs(q);

    const firstOrderOfPage = docs[pageSize * currentPage - pageSize];

    let payload;

    if (!userId) {
      payload = query(
        collection(db, collections.ORDERS),
        orderBy('orderDate', 'desc'),
        startAt(firstOrderOfPage),
        limit(pageSize),
      );
    } else {
      payload = query(
        collection(db, collections.ORDERS),
        where('uid', '==', userId),
        orderBy('orderDate', 'desc'),
        startAt(firstOrderOfPage),
        limit(pageSize),
      );
    }
    const response = await getDocs(payload);

    const orders = response.docs.map(doc => {
      const orderData = doc.data() as AdminOrder;
      const order: AdminOrder = {
        ...orderData,
        orderId: doc.id,
      };

      return order;
    });

    return { orders, ordersTotalCount: response.size };
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
  async editIsViewedByAdmin(orderId: string) {
    await updateDoc(doc(db, collections.ORDERS, orderId), { isViewedByAdmin: true });
  },
  async deleteOrder(orderId: string) {
    await deleteDoc(doc(db, collections.ORDERS, orderId));
  },
};
