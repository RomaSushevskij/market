import React, { memo, useCallback } from 'react';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';

import { OrderSchema } from '../validation';

import { OrderFormValuesType } from './types';

import { useAppDispatch } from 'hooks';
import { generateAnOrder } from 'store/reducers';

export const OrderForm = memo(() => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      address: '',
      phone: '',
    } as OrderFormValuesType,
    onSubmit: (values: OrderFormValuesType) => {
      dispatch(generateAnOrder({ customerInformation: values }));
    },
    validationSchema: OrderSchema,
  });

  const getErrorHelperText = useCallback(
    (fieldName: 'name' | 'surname' | 'address' | 'phone') => {
      const errorHelperText =
        formik.errors[fieldName] && formik.touched[fieldName]
          ? formik.errors[fieldName]
          : '';

      return errorHelperText;
    },
    [formik],
  );
  const nameErrorHelperText = getErrorHelperText('name');
  const surnameErrorHelperText = getErrorHelperText('surname');
  const addressErrorHelperText = getErrorHelperText('address');
  const phoneErrorHelperText = getErrorHelperText('phone');

  const isSubmitButtonDisabled =
    nameErrorHelperText ||
    surnameErrorHelperText ||
    addressErrorHelperText ||
    phoneErrorHelperText ||
    Object.values(formik.values).some(val => !val);

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <FormLabel sx={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
          Ordering
        </FormLabel>
        <FormGroup>
          <TextField
            fullWidth
            label="Name"
            error={!!nameErrorHelperText}
            {...formik.getFieldProps('name')}
          />
          <FormHelperText error sx={{ height: 30 }}>
            {nameErrorHelperText}
          </FormHelperText>
          <TextField
            fullWidth
            label="Surname"
            error={!!surnameErrorHelperText}
            {...formik.getFieldProps('surname')}
          />
          <FormHelperText error sx={{ height: 30 }}>
            {surnameErrorHelperText}
          </FormHelperText>
          <TextField
            fullWidth
            label="Address"
            error={!!addressErrorHelperText}
            {...formik.getFieldProps('address')}
          />
          <FormHelperText error sx={{ height: 30 }}>
            {addressErrorHelperText}
          </FormHelperText>
          <TextField
            type="tel"
            fullWidth
            label="Phone"
            error={!!phoneErrorHelperText}
            {...formik.getFieldProps('phone')}
          />
          <FormHelperText error sx={{ height: 30 }}>
            {phoneErrorHelperText}
          </FormHelperText>
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 1 }}
            disabled={!!isSubmitButtonDisabled}
          >
            Order
          </Button>
        </FormGroup>
      </FormControl>
    </form>
  );
});
