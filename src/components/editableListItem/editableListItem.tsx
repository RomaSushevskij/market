import React, { FC, useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { ListItem } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';

import { EditableListItemProps } from 'components/editableListItem/types';
import {
  ProfileEmailSchema,
  ProfileNameSchema,
} from 'components/editableListItem/validation';
import { getErrorHelperText } from 'utils';

export const EditableListItem: FC<EditableListItemProps> = prop => {
  const { onBlur, value, label } = prop;

  const [isEditMode, setEditMode] = useState(false);

  const formik = useFormik({
    initialValues: {
      fieldValue: value,
    },
    onSubmit: () => {},
    validationSchema: label === 'Name' ? ProfileNameSchema : ProfileEmailSchema,
  });

  const errorHelperText = getErrorHelperText(formik.errors, formik.touched, 'fieldValue');

  const onEditClick = () => {
    setEditMode(true);
  };

  const onTextFieldBlur = () => {
    formik.setTouched({ ...formik.touched, fieldValue: true });
    if (onBlur && !errorHelperText) onBlur(formik.values.fieldValue, setEditMode);
  };

  return (
    <ListItem sx={{ height: 70 }}>
      {isEditMode ? (
        <FormGroup sx={{ width: '100%' }}>
          <TextField
            InputProps={{ sx: { fontSize: 15 } }}
            {...formik.getFieldProps('fieldValue')}
            label={label}
            variant="standard"
            fullWidth
            autoFocus
            onBlur={onTextFieldBlur}
            error={!!errorHelperText}
          />
          <FormHelperText error sx={{ height: 20 }}>
            {errorHelperText}
          </FormHelperText>
        </FormGroup>
      ) : (
        <>
          <ListItemText primary={label} secondary={value} />
          <IconButton onClick={onEditClick}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};
