import React, { memo } from 'react';

import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

import { PRODUCTS_ROUTE } from 'appConstants';

export const LoginForm = memo(() => {
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: values => {
      const validation = 2;

      alert(JSON.stringify(values, null, validation));
    },
  });
  const primaryColor = theme.palette.primary.light;

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <FormGroup>
          <TextField
            InputProps={{
              endAdornment: <AlternateEmailOutlinedIcon sx={{ color: primaryColor }} />,
            }}
            variant="outlined"
            label="Email"
            margin="normal"
            fullWidth
            {...formik.getFieldProps('email')}
          />

          <TextField
            InputProps={{
              endAdornment: <LockOpenOutlinedIcon sx={{ color: primaryColor }} />,
            }}
            variant="outlined"
            label="Password"
            margin="normal"
            type="password"
            fullWidth
            {...formik.getFieldProps('password')}
          />

          <FormControlLabel
            label="Remember me"
            control={<Checkbox {...formik.getFieldProps('rememberMe')} />}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" type="submit" sx={{ mt: 4, bgcolor: primaryColor }}>
            login
          </Button>
          <FormHelperText sx={{ mx: 'auto', mt: 2 }}>
            {'Forgot your'}{' '}
            <NavLink
              to={PRODUCTS_ROUTE}
              style={{
                textDecoration: 'none',
                fontWeight: 'bold',
                color: primaryColor,
              }}
            >
              password?
            </NavLink>
          </FormHelperText>
          <FormHelperText sx={{ mx: 'auto' }}>
            {'Don&apos;t have an account?'}
            <NavLink
              to={PRODUCTS_ROUTE}
              style={{ textDecoration: 'none', fontWeight: 'bold', color: primaryColor }}
            >
              {'  Sign Up'}
            </NavLink>
          </FormHelperText>
        </FormGroup>
      </FormControl>
    </form>
  );
});
