import React, { FC, useState } from 'react';

import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';

import { Notification } from 'components/forms/passwordRecovery/Notification';

export const PasswordRecoveryForm: FC = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.light;
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: values => {
      const validate = 2;

      alert(JSON.stringify(values, null, validate));
      setPassword(true);
    },
  });

  const [isSetPassword, setPassword] = useState(false);

  if (isSetPassword) return <Notification />;

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
            Set new password
          </Button>
        </FormGroup>
      </FormControl>
    </form>
  );
};
