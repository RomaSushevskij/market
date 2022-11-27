import React, { FC, useCallback, useState } from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useSearchParams } from 'react-router-dom';

import { Notification } from './Notification';

import { ResetPasswordPayload } from 'api/auth/types';
import { PasswordRecoveryFormValuesType } from 'components/forms/passwordRecovery/types';
import { PasswordRecoverySchema } from 'components/forms/validation';
import { routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { resetPassword } from 'store/reducers';
import { selectAuthPageStatus } from 'store/selectors';

export const PasswordRecoveryForm: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [searchParams] = useSearchParams();

  const oobCode = searchParams.get('oobCode') || '';
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    } as PasswordRecoveryFormValuesType,
    onSubmit: async ({ newPassword }: PasswordRecoveryFormValuesType) => {
      const resetPasswordPayload: ResetPasswordPayload = {
        oobCode,
        newPassword,
      };
      const resultAction = await dispatch(resetPassword(resetPasswordPayload));

      if (resetPassword.fulfilled.match(resultAction)) {
        setPassword(true);
      }
    },
    validationSchema: PasswordRecoverySchema,
  });

  const authPageStatus = useAppSelector(selectAuthPageStatus);

  const [isSetPassword, setPassword] = useState(false);

  const getErrorHelperText = useCallback(
    (fieldName: 'newPassword' | 'confirmNewPassword') => {
      const errorHelperText =
        formik.errors[fieldName] && formik.touched[fieldName]
          ? formik.errors[fieldName]
          : '';

      return errorHelperText;
    },
    [formik],
  );
  const passwordErrorHelperText = getErrorHelperText('newPassword');
  const confirmPasswordErrorHelperText = getErrorHelperText('confirmNewPassword');

  const primaryColor = theme.palette.primary.light;
  const successColor = theme.palette.success.light;

  const getIconColor = useCallback((fieldError: string | undefined) => {
    return fieldError ? theme.palette.error.main : primaryColor;
  }, []);

  const passwordIconColor = getIconColor(passwordErrorHelperText);
  const confirmPasswordIconColor = getIconColor(confirmPasswordErrorHelperText);

  const isSubmitButtonDisabled =
    passwordErrorHelperText ||
    confirmPasswordErrorHelperText ||
    !formik.values.newPassword ||
    !formik.values.confirmNewPassword;

  if (isSetPassword)
    return (
      <Notification
        title="The new password has been successfully set"
        icon={<CheckCircleOutlineIcon sx={{ fontSize: 100, color: successColor }} />}
        linkTitle="Login with new password"
        linkPath={`${routes.AUTH_PAGE}/${routes.AUTH_SIGN_IN}`}
      />
    );

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <FormLabel>
          <Typography variant="h6" component="div" my={2}>
            Enter new password
          </Typography>
        </FormLabel>
        <FormGroup>
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
            {...formik.getFieldProps('newPassword')}
          />
          <FormHelperText error sx={{ height: 20 }}>
            {passwordErrorHelperText}
          </FormHelperText>
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
            error={!!confirmPasswordErrorHelperText}
            {...formik.getFieldProps('confirmNewPassword')}
          />
          <FormHelperText error sx={{ height: 20 }}>
            {confirmPasswordErrorHelperText}
          </FormHelperText>
          <LoadingButton
            variant="contained"
            type="submit"
            sx={{ mt: 4, bgcolor: confirmPasswordIconColor }}
            disabled={!!isSubmitButtonDisabled}
            loading={authPageStatus === 'loading'}
          >
            Set new password
          </LoadingButton>
        </FormGroup>
      </FormControl>
    </form>
  );
};
