import React, { FC, memo, useState } from 'react';

import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import MarkEmailReadOutlined from '@mui/icons-material/MarkEmailReadOutlined';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

import { InstructionsSendSchema } from '../validation';

import { Notification } from './Notification';

import { routes } from 'enums';

export const PasswordInstructionsSend: FC = memo(() => {
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      const validation = 2;

      alert(JSON.stringify(values, null, validation));
      setSendInstructions(true);
    },
    validationSchema: InstructionsSendSchema,
  });

  const [isSendInstructions, setSendInstructions] = useState(false);

  const emailErrorHelperText =
    formik.errors.email && formik.touched.email ? formik.errors.email : '';
  const primaryColor = theme.palette.primary.light;
  const successColor = theme.palette.success.light;
  const emailIconColor = emailErrorHelperText ? theme.palette.error.main : primaryColor;
  const isSubmitButtonDisabled = emailErrorHelperText || !formik.values.email;

  if (isSendInstructions)
    return (
      <Notification
        icon={<MarkEmailReadOutlined sx={{ fontSize: 100, color: successColor }} />}
        title={`We've sent an Email with instructions to ${formik.values.email}`}
      />
    );

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <FormLabel>
          <Typography variant="h6" my={2}>
            Forgot your password?
          </Typography>
          <Typography variant="body2">
            Enter your email address and we will send you further instructions
          </Typography>
        </FormLabel>
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
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 4, bgcolor: primaryColor }}
            disabled={!!isSubmitButtonDisabled}
          >
            Send instructions
          </Button>
          <FormHelperText sx={{ mt: 2, mx: 'auto' }}>
            Did you remember your password?
            <NavLink
              to={`${routes.AUTH_PAGE}/${routes.AUTH_SIGN_IN}`}
              style={{
                textDecoration: 'none',
                fontWeight: 'bold',
                color: primaryColor,
                display: 'block',
                textAlign: 'center',
              }}
            >
              Try logging in
            </NavLink>
          </FormHelperText>
        </FormGroup>
      </FormControl>
    </form>
  );
});
