export type OrderFormValuesType = {
  name: string;
  surname: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  phone: string;
};

export type FormikFieldsOrder = keyof OrderFormValuesType;
