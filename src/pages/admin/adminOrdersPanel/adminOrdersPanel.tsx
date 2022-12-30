import React, { FC } from 'react';

import { ShoppingList } from 'pages/shoppingList';

export const AdminOrdersPanel: FC = () => {
  return <ShoppingList isAdmin />;
};
