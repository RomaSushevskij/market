import React, { memo } from 'react';

import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import { useFormik } from 'formik';

import { OrderFormValuesType } from 'components/forms/orderForm/types';

export const OrderForm = memo(() => {
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      address: '',
      phone: '',
    } as OrderFormValuesType,
    onSubmit: (values: OrderFormValuesType) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <FormLabel sx={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
          Ordering
        </FormLabel>
        <FormGroup>
          <Box>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              {...formik.getFieldProps('name')}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="Surname"
              margin="normal"
              {...formik.getFieldProps('surname')}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="Address"
              margin="normal"
              {...formik.getFieldProps('address')}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="Phone"
              margin="normal"
              {...formik.getFieldProps('phone')}
            />
          </Box>
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Order
          </Button>
        </FormGroup>
      </FormControl>
    </form>
  );
});
