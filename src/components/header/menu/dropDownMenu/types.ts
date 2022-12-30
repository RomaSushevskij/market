export type DropDownMenuProps = {
  isAdmin: boolean;
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  accountName: string | null;
  orderItemsTotalCount?: number;
  onProfileClick?: () => void;
  onShoppingListClick?: () => void;
  onLogOutMenuItemClick: () => void;
  onShoppingCartClick?: () => void;
  onOrdersClick?: () => void;
  onProductsClick?: () => void;
  onUsersClick?: () => void;
};
