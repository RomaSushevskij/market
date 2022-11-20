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

import {
  AUTH_PAGE_ROUTE,
  AUTH_SEND_INSTRUCTIONS_ROUTE,
  AUTH_SIGN_UP_ROUTE,
} from 'appConstants';
import { SignInFormValuesType } from 'components/forms/loginForm/types';
import { SignInSchema } from 'components/forms/loginForm/validation';

export const LoginForm = memo(() => {
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: true,
    } as SignInFormValuesType,
    onSubmit: (values: SignInFormValuesType) => {
      const validation = 2;

      alert(JSON.stringify(values, null, validation));
    },
    validationSchema: SignInSchema,
  });

  const getErrorHelperText = (
    formikObj: typeof formik,
    fieldName: 'email' | 'password',
  ) => {
    const errorHelperText =
      formikObj.errors[fieldName] && formikObj.touched[fieldName]
        ? formikObj.errors[fieldName]
        : '';

    return errorHelperText;
  };
  const emailFieldError = getErrorHelperText(formik, 'email');
  const passwordFieldError = getErrorHelperText(formik, 'password');

  const primaryColor = theme.palette.primary.light;

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <FormGroup>
          <TextField
            InputProps={{
              endAdornment: (
                <AlternateEmailOutlinedIcon
                  sx={{
                    color: emailFieldError ? theme.palette.error.main : primaryColor,
                  }}
                />
              ),
              autoComplete: 'off',
            }}
            variant="outlined"
            label="Email"
            sx={{ mt: 2 }}
            fullWidth
            error={!!emailFieldError}
            {...formik.getFieldProps('email')}
          />
          <FormHelperText error sx={{ height: 20 }}>
            {emailFieldError}
          </FormHelperText>
          <TextField
            id="password"
            InputProps={{
              endAdornment: <LockOpenOutlinedIcon sx={{ color: primaryColor }} />,
              autoComplete: 'new-password',
            }}
            variant="outlined"
            label="Password"
            type="password"
            autoComplete="new-password"
            fullWidth
            sx={{ mt: 2 }}
            error={!!passwordFieldError}
            {...formik.getFieldProps('password')}
          />
          <FormHelperText error sx={{ height: 20 }}>
            {passwordFieldError}
          </FormHelperText>

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
              to={`${AUTH_PAGE_ROUTE}/${AUTH_SEND_INSTRUCTIONS_ROUTE}`}
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
            Don&apos;t have an account?
            <NavLink
              to={`${AUTH_PAGE_ROUTE}/${AUTH_SIGN_UP_ROUTE}`}
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
