export type OrderFormValuesType = {
  name: string;
  surname: string;
  address: string;
  phone: string;
};

export type FormikFieldsOrder = keyof OrderFormValuesType;
