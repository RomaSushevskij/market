import { ProductType } from 'store/reducers';

export type AddUpdateProductProps = {
  onSubmit: () => void;
  formType: 'Add' | 'Update';
  activeProduct?: ProductType;
};
