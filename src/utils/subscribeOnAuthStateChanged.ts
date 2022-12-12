import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Dispatch } from 'redux';

import { getOrderListToLocalStorage } from 'services/localStorage';
import { initializeApp, setOrderList, setUserAuth } from 'store/reducers';
import { setAdminAuth } from 'store/reducers/adminAuth';

const auth = getAuth();

export const subscribeOnAuthStateChanged = (dispatch: Dispatch) => {
  const adminId = process.env.REACT_APP_FIREBASE_ADMIN_ID;

  const unsubscribe = onAuthStateChanged(auth, user => {
    console.log(user);
    if (user && user.emailVerified) {
      const { email, displayName, uid } = user;

      if (uid === adminId) {
        dispatch(setAdminAuth());
      }
      dispatch(setUserAuth({ email, displayName, uid }));
      dispatch(setOrderList({ orderList: getOrderListToLocalStorage(uid) }));
    }
    dispatch(initializeApp());
  });

  return unsubscribe;
};
