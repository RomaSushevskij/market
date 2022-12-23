import React, { FC, memo } from 'react';

import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

import { SignInSchema } from '../validation';

import { FormikFieldSignIn, LoginFormProps, SignInFormValuesType } from './types';

import { routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { usePalette } from 'hooks/usePalette/usePalette';
import { signIn } from 'store/reducers';
import { selectAuthPageStatus } from 'store/selectors';
import { getErrorHelperText, useIconColor } from 'utils/formikHelpers';

export const LoginForm: FC<LoginFormProps> = memo(prop => {
  const { isAdmin } = prop;
  const { primaryColor } = usePalette();
  const dispatch = useAppDispatch();
  const authPageStatus = useAppSelector(selectAuthPageStatus);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: true,
    } as SignInFormValuesType,
    onSubmit: (values: SignInFormValuesType) => {
      const { email, password, rememberMe } = values;

      dispatch(signIn({ email, password, rememberMe, isAuthForAdmin: isAdmin }));
    },
    validationSchema: SignInSchema,
  });

  const emailErrorHelperText = getErrorHelperText<FormikFieldSignIn>(
    formik.errors,
    formik.touched,
    'email',
  );
  const passwordErrorHelperText = getErrorHelperText<FormikFieldSignIn>(
    formik.errors,
    formik.touched,
    'password',
  );

  const emailIconColor = useIconColor(emailErrorHelperText);
  const passwordIconColor = useIconColor(passwordErrorHelperText);

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
          {!isAdmin && (
            <FormControlLabel
              label="Remember me"
              control={<Checkbox {...formik.getFieldProps('rememberMe')} />}
              sx={{ mt: 2 }}
            />
          )}
          <LoadingButton
            variant="contained"
            type="submit"
            sx={{ mt: 4, bgcolor: primaryColor }}
            disabled={!!isSubmitButtonDisabled}
            loading={authPageStatus === 'loading'}
          >
            login
          </LoadingButton>
          {!isAdmin && (
            <>
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
                  style={{
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    color: primaryColor,
                  }}
                >
                  {'  Sign Up'}
                </NavLink>
              </FormHelperText>
            </>
          )}
        </FormGroup>
      </FormControl>
    </form>
  );
});
