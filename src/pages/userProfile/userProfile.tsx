import React, { ChangeEvent, FC, useRef, useState } from 'react';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import photo from 'assets/images/product.png';
import { EditableListItem } from 'components/editableListItem/editableListItem';

export const UserProfile: FC = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [productImage64, setProductImage64] = useState('');

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
    }
    console.log(productImage64);
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6">User Profile</Typography>
      <Divider sx={{ my: 3 }} />
      <Stack direction={{ sm: 'row' }} alignItems="center">
        <Box position="relative">
          <Avatar
            src={photo}
            sx={{
              width: 180,
              height: 180,
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              mr: { sm: 4 },
            }}
          />
          <Fab
            component="label"
            size="small"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 130,
            }}
          >
            <input
              ref={inputFileRef}
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={onChangeProductImage}
            />
            <PhotoCameraIcon />
          </Fab>
        </Box>
        <List>
          <EditableListItem value="Roman Sushevskij" label="Name" />
          <EditableListItem value="roma.sushevskij@yandex.ru" label="Email" />
          <ListItem>
            <ListItemText primary="User ID" secondary="LKUGf324flqks1384rgakSFGOQ8WR" />
          </ListItem>
        </List>
      </Stack>
    </Paper>
  );
};
