import React, { memo, useMemo } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import ReactPhoneInput from 'react-phone-input-material-ui';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { useNavigate } from 'react-router-dom';

import { OrderSchema } from '../validation';

import { FormikFieldsOrder, OrderFormValuesType } from './types';

import { routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { addOrder, OrderInformationType } from 'store/reducers';
import { selectOrdersPageStatus } from 'store/selectors';
import { getErrorHelperText } from 'utils/formikHelpers';
import { getValidAddressString } from 'utils/getValidAddressString';

export const OrderForm = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const ordersPageStatus = useAppSelector(selectOrdersPageStatus);

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      city: '',
      street: '',
      house: '',
      apartment: '',
      phone: '',
    } as OrderFormValuesType,
    onSubmit: async (values: OrderFormValuesType) => {
      const { name, surname, phone, city, street, house, apartment } = values;
      const addOrderPayload: Omit<OrderInformationType, 'totalCost'> = {
        name,
        surname,
        phone: formatPhoneNumberIntl(`+${phone}`),
        address: getValidAddressString(city, street, house, apartment),
      };

      const resultAction = await dispatch(addOrder(addOrderPayload));

      if (addOrder.fulfilled.match(resultAction)) {
        navigate(routes.ORDER_LIST);
      }
    },
    validationSchema: OrderSchema,
  });

  const nameErrorHelperText = getErrorHelperText<FormikFieldsOrder>(
    formik.errors,
    formik.touched,
    'name',
  );
  const surnameErrorHelperText = getErrorHelperText<FormikFieldsOrder>(
    formik.errors,
    formik.touched,
    'surname',
  );
  const cityErrorHelperText = getErrorHelperText<FormikFieldsOrder>(
    formik.errors,
    formik.touched,
    'city',
  );
  const streetErrorHelperText = getErrorHelperText<FormikFieldsOrder>(
    formik.errors,
    formik.touched,
    'street',
  );
  const houseErrorHelperText = getErrorHelperText<FormikFieldsOrder>(
    formik.errors,
    formik.touched,
    'house',
  );
  const phoneErrorHelperText = getErrorHelperText<FormikFieldsOrder>(
    formik.errors,
    formik.touched,
    'phone',
  );

  const isEmptyFields = useMemo(() => {
    return Object.entries(formik.values).some(
      valArr => valArr[0] !== 'apartment' && !valArr[1],
    );
  }, [formik.values]);

  const isSubmitButtonDisabled =
    nameErrorHelperText ||
    surnameErrorHelperText ||
    cityErrorHelperText ||
    streetErrorHelperText ||
    houseErrorHelperText ||
    phoneErrorHelperText ||
    isEmptyFields;

  const fieldHelperTextStyle: SxProps<Theme> = {
    height: 24,
    lineHeight: 1,
    fontSize: 11,
    mx: 1,
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <FormLabel sx={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
          Ordering
        </FormLabel>
        <FormGroup>
          <TextField
            size="small"
            fullWidth
            label="Name"
            error={!!nameErrorHelperText}
            {...formik.getFieldProps('name')}
          />
          <FormHelperText error sx={{ height: 24 }}>
            {nameErrorHelperText}
          </FormHelperText>
          <TextField
            size="small"
            fullWidth
            label="Surname"
            error={!!surnameErrorHelperText}
            {...formik.getFieldProps('surname')}
          />
          <FormHelperText error sx={{ height: 20 }}>
            {surnameErrorHelperText}
          </FormHelperText>
          <Stack>
            <Stack direction="row">
              <Box>
                <TextField
                  size="small"
                  fullWidth
                  label="City"
                  error={!!cityErrorHelperText}
                  {...formik.getFieldProps('city')}
                />
                <FormHelperText error sx={fieldHelperTextStyle}>
                  {cityErrorHelperText}
                </FormHelperText>
              </Box>
              <Box>
                <TextField
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  size="small"
                  fullWidth
                  label="Street"
                  error={!!streetErrorHelperText}
                  {...formik.getFieldProps('street')}
                />
                <FormHelperText error sx={fieldHelperTextStyle}>
                  {streetErrorHelperText}
                </FormHelperText>
              </Box>
            </Stack>
            <Stack direction="row">
              <Box>
                <TextField
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  size="small"
                  fullWidth
                  label="House"
                  error={!!houseErrorHelperText}
                  {...formik.getFieldProps('house')}
                />
                <FormHelperText error sx={fieldHelperTextStyle}>
                  {houseErrorHelperText}
                </FormHelperText>
              </Box>
              <Box>
                <TextField
                  InputLabelProps={{ style: { fontSize: 13 } }}
                  size="small"
                  fullWidth
                  label="Apartment"
                  {...formik.getFieldProps('apartment')}
                />
              </Box>
            </Stack>
          </Stack>
          <ReactPhoneInput
            inputProps={{
              size: 'small',
              type: 'tel',
              fullWidth: true,
              label: 'Phone',
              name: 'phone',
              id: 'phone',
              error: !!phoneErrorHelperText,
            }}
            value={formik.values.phone}
            onChange={e => formik.setFieldValue('phone', e)}
            onBlur={() => formik.setTouched({ ...formik.touched, phone: true })}
            component={TextField}
          />
          <FormHelperText error sx={{ height: 24 }}>
            {phoneErrorHelperText}
          </FormHelperText>
          <LoadingButton
            loading={ordersPageStatus === 'loading'}
            variant="contained"
            type="submit"
            sx={{ mt: 1 }}
            disabled={!!isSubmitButtonDisabled}
          >
            Order
          </LoadingButton>
        </FormGroup>
      </FormControl>
    </form>
  );
});
