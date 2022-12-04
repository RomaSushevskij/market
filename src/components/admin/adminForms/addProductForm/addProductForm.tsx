import React, { ChangeEvent, FC, useRef, useState } from 'react';

import { PhotoCamera } from '@mui/icons-material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';

import { AddProductFormValues } from 'components/admin/adminForms/addProductForm/types';
import { useAppDispatch } from 'hooks';
import { usePalette } from 'hooks/usePalette/usePalette';
import { addProduct } from 'store/reducers';

export const AddProductForm: FC = () => {
  const dispatch = useAppDispatch();
  const { primaryColor } = usePalette();
  const [productImageURL, setProductImageURL] = useState('');
  const [productImage64, setProductImage64] = useState('');
  const formik = useFormik({
    initialValues: {
      title: '',
      image: '',
      price: '',
    },
    onSubmit: ({ title, price }: AddProductFormValues) => {
      dispatch(addProduct({ title, price: Number(price), image: productImage64 }));
    },
  });

  const inputFileRef = useRef<HTMLInputElement>(null);

  const onChangeProductImage = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const reader = new FileReader();

    const productImage = e.target.files && e.target.files[0];

    if (productImage) {
      formData.append('productImage', productImage, productImage.name);

      reader.onloadend = () => {
        if (reader.result) setProductImage64(reader.result as string);
      };
      reader.readAsDataURL(productImage);
      setProductImageURL(window.URL.createObjectURL(productImage));
    }
  };

  const blueColorDegree = 500;

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
          <Avatar
            src={productImageURL}
            alt="Product Image"
            variant="rounded"
            sx={{
              width: 250,
              height: 250,
              bgcolor: 'transparent',
              borderWidth: 1,
              borderStyle: 'dashed',
              padding: 0,
              borderColor: blue[blueColorDegree],
              alignSelf: 'center',
            }}
          >
            <AddPhotoAlternateOutlinedIcon
              sx={{ fontSize: 60, color: blue[blueColorDegree] }}
            />
          </Avatar>
          <Button
            endIcon={<PhotoCamera />}
            variant="text"
            component="label"
            sx={{ textAlign: 'end', alignSelf: 'center' }}
            size="small"
          >
            Upload a photo
            <input
              ref={inputFileRef}
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={onChangeProductImage}
            />
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
