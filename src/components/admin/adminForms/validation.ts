import { object, SchemaOf, string, number } from 'yup';

import { AddProductFormValues } from 'components/admin/adminForms/addProductForm';

const endPoints = {
  titleMax: 40,
};

export const AddProductSchema: SchemaOf<AddProductFormValues> = object().shape({
  title: string()
    .required('Field is required')
    .max(endPoints.titleMax, 'Title must be no more than 40 characters'),
  price: number()
    .typeError('Price must be a number')
    .required('Field is required')
    .positive(),
});
