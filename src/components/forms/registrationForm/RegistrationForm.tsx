import React, { FC, memo } from 'react';

import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

import { AUTH_PAGE_ROUTE, AUTH_SIGN_IN_ROUTE } from 'appConstants';

export const RegistrationForm: FC = memo(() => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.light;
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: values => {
      const validation = 2;

      alert(JSON.stringify(values, null, validation));
    },
  });

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
            autoComplete="new-password"
            fullWidth
            {...formik.getFieldProps('password')}
          />
          <TextField
            InputProps={{
              endAdornment: <LockOpenOutlinedIcon sx={{ color: primaryColor }} />,
            }}
            variant="outlined"
            label="Confirm password"
            margin="normal"
            type="password"
            autoComplete="new-password"
            fullWidth
            {...formik.getFieldProps('confirmPassword')}
          />

          <Button variant="contained" type="submit" sx={{ mt: 4, bgcolor: primaryColor }}>
            Sign Up
          </Button>
          <FormHelperText sx={{ mx: 'auto', mt: 2 }}>
            {"I'm already a member!"}{' '}
            <NavLink
              to={`${AUTH_PAGE_ROUTE}/${AUTH_SIGN_IN_ROUTE}`}
              style={{
                textDecoration: 'none',
                fontWeight: 'bold',
                color: primaryColor,
              }}
            >
              {'  Sign In'}
            </NavLink>
          </FormHelperText>
        </FormGroup>
      </FormControl>
    </form>
  );
});
