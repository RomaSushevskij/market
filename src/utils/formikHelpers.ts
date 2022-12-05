import { useMemo } from 'react';

import { FormikErrors, FormikTouched } from 'formik';

import { usePalette } from 'hooks/usePalette/usePalette';

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

export const useIconColor = (fieldError: string | undefined) => {
  const { primaryColor, errorColor } = usePalette();
  const iconColor = useMemo(() => {
    return fieldError ? errorColor : primaryColor;
  }, [errorColor, primaryColor, fieldError]);

  return iconColor;
};
