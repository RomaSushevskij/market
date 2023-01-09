import React, { FC, memo, useState } from 'react';

import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import MarkEmailReadOutlined from '@mui/icons-material/MarkEmailReadOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

import { FormikFieldSignUp, SignUpFormValuesType } from './types';

import { Notification } from 'components/forms/passwordRecovery/Notification';
import { SignUpSchema } from 'components/forms/validation';
import { routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { usePalette } from 'hooks/usePalette/usePalette';
import { signUp } from 'store/reducers';
import { selectAuthPageStatus } from 'store/selectors';
import { getErrorHelperText, useIconColor } from 'utils/formikHelpers';

export const RegistrationForm: FC = memo(() => {
  const dispatch = useAppDispatch();
  const { primaryColor, successColor } = usePalette();

  const [isSignUpSuccess, setSignUpSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    } as SignUpFormValuesType,
    onSubmit: async ({ email, password }) => {
      const resultAction = await dispatch(signUp({ email, password }));

      if (signUp.fulfilled.match(resultAction)) {
        setSignUpSuccess(true);
      }
    },
    validationSchema: SignUpSchema,
  });

  const authPageStatus = useAppSelector(selectAuthPageStatus);

  const emailErrorHelperText = getErrorHelperText<FormikFieldSignUp>(
    formik.errors,
    formik.touched,
    'email',
  );
  const passwordErrorHelperText = getErrorHelperText<FormikFieldSignUp>(
    formik.errors,
    formik.touched,
    'password',
  );
  const confirmPasswordErrorHelperText = getErrorHelperText<FormikFieldSignUp>(
    formik.errors,
    formik.touched,
    'confirmPassword',
  );

  const emailIconColor = useIconColor(emailErrorHelperText);
  const passwordIconColor = useIconColor(passwordErrorHelperText);
  const confirmPasswordIconColor = useIconColor(confirmPasswordErrorHelperText);

  const isSubmitButtonDisabled =
    emailErrorHelperText ||
    passwordErrorHelperText ||
    confirmPasswordErrorHelperText ||
    !formik.values.email ||
    !formik.values.password ||
    !formik.values.confirmPassword;

  if (isSignUpSuccess)
    return (
      <Notification
        icon={<MarkEmailReadOutlined sx={{ fontSize: 100, color: successColor }} />}
        title={`An email has been sent to you at ${formik.values.email} with instructions on how to confirm your email address.`}
      />
    );

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
          <LoadingButton
            variant="contained"
            type="submit"
            sx={{ mt: 4, bgcolor: primaryColor }}
            disabled={!!isSubmitButtonDisabled}
            loading={authPageStatus === 'loading'}
          >
            Sign Up
          </LoadingButton>
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
