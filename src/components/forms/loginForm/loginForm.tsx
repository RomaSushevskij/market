import React, { memo, useCallback } from 'react';

import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

import { SignInSchema } from '../validation';

import { SignInFormValuesType } from './types';

import { routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { signIn } from 'store/reducers';
import { selectAuthPageStatus } from 'store/selectors';

export const LoginForm = memo(() => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const authPageStatus = useAppSelector(selectAuthPageStatus);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: true,
    } as SignInFormValuesType,
    onSubmit: (values: SignInFormValuesType) => {
      const { email, password } = values;

      dispatch(signIn({ email, password }));
    },
    validationSchema: SignInSchema,
  });

  const getErrorHelperText = useCallback(
    (fieldName: 'email' | 'password') => {
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
  const primaryColor = theme.palette.primary.light;
  const getIconColor = useCallback((fieldError: string | undefined) => {
    return fieldError ? theme.palette.error.main : primaryColor;
  }, []);
  const emailIconColor = getIconColor(emailErrorHelperText);
  const passwordIconColor = getIconColor(passwordErrorHelperText);
  const isSubmitButtonDisabled =
    emailErrorHelperText ||
    passwordErrorHelperText ||
    !formik.values.email ||
    !formik.values.password;

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <FormGroup>
          <TextField
            InputProps={{
              endAdornment: (
                <AlternateEmailOutlinedIcon
                  sx={{
                    color: emailIconColor,
                  }}
                />
              ),
              autoComplete: 'off',
            }}
            variant="outlined"
            label="Email"
            sx={{ mt: 2 }}
            fullWidth
            error={!!emailErrorHelperText}
            {...formik.getFieldProps('email')}
          />
          <FormHelperText error sx={{ height: 20 }}>
            {emailErrorHelperText}
          </FormHelperText>
          <TextField
            id="password"
            InputProps={{
              endAdornment: <LockOpenOutlinedIcon sx={{ color: passwordIconColor }} />,
              autoComplete: 'new-password',
            }}
            variant="outlined"
            label="Password"
            type="password"
            autoComplete="new-password"
            fullWidth
            sx={{ mt: 2 }}
            error={!!passwordErrorHelperText}
            {...formik.getFieldProps('password')}
          />
          <FormHelperText error sx={{ height: 20 }}>
            {passwordErrorHelperText}
          </FormHelperText>
          <FormControlLabel
            label="Remember me"
            control={<Checkbox {...formik.getFieldProps('rememberMe')} />}
            sx={{ mt: 2 }}
          />
          <LoadingButton
            variant="contained"
            type="submit"
            sx={{ mt: 4, bgcolor: primaryColor }}
            disabled={!!isSubmitButtonDisabled}
            loading={authPageStatus === 'loading'}
          >
            login
          </LoadingButton>
          <FormHelperText sx={{ mx: 'auto', mt: 2 }}>
            {'Forgot your'}{' '}
            <NavLink
              to={`${routes.AUTH_PAGE}/${routes.AUTH_SEND_INSTRUCTIONS}`}
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
              to={`${routes.AUTH_PAGE}/${routes.AUTH_SIGN_UP}`}
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
