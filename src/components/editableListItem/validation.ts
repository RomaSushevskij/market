import { object, SchemaOf, string } from 'yup';

const nameMaxLength = 20;

export const ProfileNameSchema: SchemaOf<{ fieldValue: string | undefined }> =
  object().shape({
    fieldValue: string().max(nameMaxLength, 'Field can not be more than 20 character'),
  });
export const ProfileEmailSchema: SchemaOf<{ fieldValue: string }> = object().shape({
  fieldValue: string().required('Field is required').email('Invalid email address'),
});
