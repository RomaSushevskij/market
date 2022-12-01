import React, { FC } from 'react';

import { PhotoCamera } from '@mui/icons-material';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';

import { AddProductFormValues } from 'components/admin/adminForms/addProductForm/types';
import { usePalette } from 'hooks/usePalette/usePalette';

export const AddProductForm: FC = () => {
  const { primaryColor } = usePalette();
  const formik = useFormik({
    initialValues: {
      title: '',
      image: '',
      price: '',
    },
    onSubmit: (values: AddProductFormValues) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <FormGroup>
          <TextField
            InputProps={{
              endAdornment: <TitleOutlinedIcon />,
            }}
            variant="standard"
            label="Title"
            sx={{ mt: 2 }}
            fullWidth
            {...formik.getFieldProps('title')}
          />
          <FormHelperText error sx={{ height: 20 }} />
          <TextField
            InputProps={{
              endAdornment: <LocalAtmOutlinedIcon />,
            }}
            variant="standard"
            label="Price"
            fullWidth
            sx={{ mt: 2 }}
            {...formik.getFieldProps('price')}
          />
          <FormHelperText error sx={{ height: 20 }} />
          <Button
            endIcon={<PhotoCamera />}
            variant="text"
            component="label"
            sx={{ textAlign: 'end', alignSelf: 'center' }}
            size="small"
          >
            Upload a photo
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <LoadingButton
            variant="contained"
            type="submit"
            sx={{ mt: 4, bgcolor: primaryColor, alignSelf: 'center' }}
          >
            Add product
          </LoadingButton>
        </FormGroup>
      </FormControl>
    </form>
  );
};
