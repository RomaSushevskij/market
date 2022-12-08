import React, { ChangeEvent, FC, useRef, useState } from 'react';

import { PhotoCamera } from '@mui/icons-material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';

import { AddProductFormValues } from 'components/admin/adminForms/addProductForm/types';
import { AddProductSchema } from 'components/admin/adminForms/validation';
import { useAppDispatch, useAppSelector } from 'hooks';
import { usePalette } from 'hooks/usePalette/usePalette';
import { AddUpdateProductProps } from 'pages/admin/productsPanel/types';
import { addProduct, updateProduct } from 'store/reducers';
import { selectAdminProductsStatus } from 'store/selectors/adminProductsPanelSelectors';
import { getErrorHelperText, useIconColor } from 'utils/formikHelpers';

export const AddUpdateProductForm: FC<AddUpdateProductProps> = ({
  onSubmit,
  formType,
  activeProduct,
}) => {
  const dispatch = useAppDispatch();
  const { primaryColor } = usePalette();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const pageStatus = useAppSelector(selectAdminProductsStatus);

  const [productImageURL, setProductImageURL] = useState(
    activeProduct ? activeProduct.image : '',
  );
  const [productImage64, setProductImage64] = useState(
    activeProduct ? activeProduct.image : '',
  );

  const formik = useFormik({
    initialValues: {
      title: activeProduct ? activeProduct.title : '',
      price: activeProduct ? activeProduct.price : 0,
    },
    onSubmit: async ({ title, price }: AddProductFormValues) => {
      if (activeProduct) {
        const resultAction = await dispatch(
          updateProduct({
            title,
            price: Number(price),
            image: productImage64,
            id: activeProduct.id,
          }),
        );

        if (updateProduct.fulfilled.match(resultAction)) {
          onSubmit();
        }

        return;
      }

      const resultAction = await dispatch(
        addProduct({
          title,
          price: Number(price),
          image: productImage64,
        }),
      );

      if (addProduct.fulfilled.match(resultAction)) {
        onSubmit();
      }
    },
    validationSchema: AddProductSchema,
  });

  const titleErrorHelperText = getErrorHelperText<keyof typeof formik.values>(
    formik.errors,
    formik.touched,
    'title',
  );
  const priceErrorHelperText = getErrorHelperText<keyof typeof formik.values>(
    formik.errors,
    formik.touched,
    'price',
  );

  const titleIconColor = useIconColor(titleErrorHelperText);
  const priceIconColor = useIconColor(priceErrorHelperText);

  const isSubmitButtonDisabled =
    titleErrorHelperText ||
    priceErrorHelperText ||
    !formik.values.price ||
    !formik.values.title ||
    !productImage64;

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

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <FormGroup>
          <TextField
            InputProps={{
              endAdornment: <TitleOutlinedIcon sx={{ color: titleIconColor }} />,
            }}
            variant="standard"
            label="Title"
            sx={{ mt: 2 }}
            fullWidth
            error={!!titleErrorHelperText}
            {...formik.getFieldProps('title')}
          />
          <FormHelperText error sx={{ height: 20 }}>
            {titleErrorHelperText}
          </FormHelperText>
          <TextField
            InputProps={{
              endAdornment: <LocalAtmOutlinedIcon sx={{ color: priceIconColor }} />,
            }}
            variant="standard"
            label="Price"
            fullWidth
            error={!!priceErrorHelperText}
            sx={{ mt: 2 }}
            {...formik.getFieldProps('price')}
          />
          <FormHelperText error sx={{ height: 20 }}>
            {priceErrorHelperText}
          </FormHelperText>
          <Avatar
            src={productImageURL}
            alt="Product Image"
            variant="rounded"
            sx={{
              width: 200,
              height: 200,
              bgcolor: 'transparent',
              borderWidth: 1,
              borderStyle: 'dashed',
              padding: 0,
              borderColor: primaryColor,
              alignSelf: 'center',
            }}
          >
            <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 60, color: primaryColor }} />
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
            loading={pageStatus === 'loading'}
            disabled={!!isSubmitButtonDisabled}
            variant="contained"
            type="submit"
            sx={{ mt: 4, bgcolor: primaryColor, alignSelf: 'center' }}
          >
            {formType === 'Add' ? 'Add product' : 'Update product'}
          </LoadingButton>
        </FormGroup>
      </FormControl>
    </form>
  );
};
