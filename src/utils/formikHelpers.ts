import { FormikErrors, FormikTouched } from 'formik';

export const getErrorHelperText = <T>(
  errors: FormikErrors<unknown>,
  touched: FormikTouched<unknown>,
  fieldName: T,
): string => {
  const errorHelperText =
    errors[fieldName as keyof FormikErrors<unknown>] &&
    touched[fieldName as keyof FormikTouched<unknown>]
      ? errors[fieldName as keyof FormikErrors<unknown>]
      : '';

  return errorHelperText;
};
