import React, { FC, memo, useCallback } from 'react';

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

import { SignUpSchema } from '../validation';

import { SignUpFormValuesType } from './types';

import { routes } from 'enums';

export const RegistrationForm: FC = memo(() => {
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    } as SignUpFormValuesType,
    onSubmit: values => {
      const validation = 2;

      alert(JSON.stringify(values, null, validation));
    },
    validationSchema: SignUpSchema,
  });

  const getErrorHelperText = useCallback(
    (fieldName: 'email' | 'password' | 'confirmPassword') => {
      const errorHelperText =
        formik.errors[fieldName] && formik.touched[fieldName]
          ? formik.errors[fieldName]
          : '';

      return errorHelperText;
    },
    [formik],
  );

  const emailErrorHelperText = getErrorHelperText('email');
  const passwordErrorHelperText = getErrorHelperText('password');
  const confirmPasswordErrorHelperText = getErrorHelperText('confirmPassword');
  const primaryColor = theme.palette.primary.light;
  const getIconColor = useCallback((fieldError: string | undefined) => {
    return fieldError ? theme.palette.error.main : primaryColor;
  }, []);
  const emailIconColor = getIconColor(emailErrorHelperText);
  const passwordIconColor = getIconColor(passwordErrorHelperText);
  const confirmPasswordIconColor = getIconColor(confirmPasswordErrorHelperText);
  const isSubmitButtonDisabled =
    emailErrorHelperText ||
    passwordErrorHelperText ||
    confirmPasswordErrorHelperText ||
    !formik.values.email ||
    !formik.values.password ||
    !formik.values.confirmPassword;

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <FormGroup>
          <TextField
            InputProps={{
              endAdornment: <AlternateEmailOutlinedIcon sx={{ color: emailIconColor }} />,
            }}
            variant="outlined"
            label="Email"
            margin="normal"
            fullWidth
            error={!!emailErrorHelperText}
            {...formik.getFieldProps('email')}
          />
          <FormHelperText error sx={{ height: 20 }}>
            {emailErrorHelperText}
          </FormHelperText>
          <TextField
            InputProps={{
              endAdornment: <LockOpenOutlinedIcon sx={{ color: passwordIconColor }} />,
            }}
            variant="outlined"
            label="Password"
            margin="normal"
            type="password"
            autoComplete="new-password"
            fullWidth
            error={!!passwordErrorHelperText}
            {...formik.getFieldProps('password')}
          />
          <FormHelperText error sx={{ height: 20 }}>
            {passwordErrorHelperText}
          </FormHelperText>
          <TextField
            InputProps={{
              endAdornment: (
                <LockOpenOutlinedIcon sx={{ color: confirmPasswordIconColor }} />
              ),
            }}
            variant="outlined"
            label="Confirm password"
            margin="normal"
            type="password"
            autoComplete="new-password"
            fullWidth
            error={!!confirmPasswordErrorHelperText}
            {...formik.getFieldProps('confirmPassword')}
          />
          <FormHelperText error sx={{ height: 20 }}>
            {confirmPasswordErrorHelperText}
          </FormHelperText>
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 4, bgcolor: primaryColor }}
            disabled={!!isSubmitButtonDisabled}
          >
            Sign Up
          </Button>
          <FormHelperText sx={{ mx: 'auto', mt: 2 }}>
            {"I'm already a member!"}{' '}
            <NavLink
              to={`${routes.AUTH_PAGE}/${routes.AUTH_SIGN_IN}`}
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
