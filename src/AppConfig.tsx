import React, { FC, useEffect } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { AdminApp } from 'AdminApp';
import App from 'App';
import { useAppDispatch } from 'hooks';
import { getOrderListToLocalStorage } from 'services/localStorage';
import { initializeApp, setUserAuth } from 'store/reducers';
import { setAdminAuth } from 'store/reducers/adminAuth';
import { setOrderList } from 'store/reducers/orders/ordersReducer';
import { defineAppType } from 'utils';

const appType = defineAppType();
const adminId = process.env.REACT_APP_FIREBASE_ADMIN_ID;
const auth = getAuth();

export const AppConfig: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user && user.emailVerified) {
        const { email, displayName, uid, photoURL } = user;

        if (appType === 'adminApp') {
          if (uid === adminId) {
            dispatch(setAdminAuth({ email, displayName, photoURL }));
          }
        } else {
          dispatch(setUserAuth({ email, displayName, uid, photoURL }));
          dispatch(setOrderList({ orderList: getOrderListToLocalStorage(uid) }));
        }
      }
      dispatch(initializeApp());
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return <>{appType === 'adminApp' ? <AdminApp /> : <App />} </>;
};
