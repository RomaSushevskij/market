import React, { FC, memo } from 'react';

import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

import { AUTH_PAGE_ROUTE, AUTH_SIGN_IN_ROUTE } from 'appConstants';

export const PasswordInstructionsSend: FC = memo(() => {
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      email: '',
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
        <FormLabel>
          <Typography variant="h6" component="div" my={2}>
            Forgot your password?
          </Typography>
          <Typography variant="body2" component="div">
            Enter your email address and we will send you further instructions
          </Typography>
        </FormLabel>
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
          <Button variant="contained" type="submit" sx={{ mt: 4, bgcolor: primaryColor }}>
            Send instructions
          </Button>
          <FormHelperText sx={{ mt: 2, mx: 'auto' }}>
            Did you remember your password?
            <Box textAlign="center">
              <NavLink
                to={`${AUTH_PAGE_ROUTE}/${AUTH_SIGN_IN_ROUTE}`}
                style={{
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  color: primaryColor,
                }}
              >
                Try logging in
              </NavLink>
            </Box>
          </FormHelperText>
        </FormGroup>
      </FormControl>
    </form>
  );
});
