import React, { ChangeEvent, FC, useRef } from 'react';

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

import { EditableListItem } from 'components/editableListItem/editableListItem';
import { useAppDispatch, useAppSelector } from 'hooks';
import { updateProfile } from 'store/reducers';
import { selectAuthPageStatus, selectPhotoURL, selectUserName } from 'store/selectors';

export const UserProfile: FC = () => {
  const dispatch = useAppDispatch();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const authPageStatus = useAppSelector(selectAuthPageStatus);
  const photoURL = useAppSelector(selectPhotoURL);
  const userName = useAppSelector(selectUserName);

  const onChangeProductImage = (e: ChangeEvent<HTMLInputElement>) => {
    const profileImage = e.target.files && e.target.files[0];

    dispatch(updateProfile({ photoFile: profileImage }));
  };

  const onNameFieldBlur = async (
    value: string,
    setEditMode: (isEditMode: boolean) => void,
  ) => {
    if (value !== userName) {
      const resultAction = await dispatch(updateProfile({ displayName: value }));

      if (updateProfile.fulfilled.match(resultAction)) {
        setEditMode(false);
      }
    }
    setEditMode(false);
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6">User Profile</Typography>
      <Divider sx={{ my: 3 }} />
      <Stack direction={{ sm: 'row' }} alignItems="center">
        <Box position="relative">
          <Avatar
            src={photoURL || undefined}
            sx={{
              width: 180,
              height: 180,
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              mr: { sm: 4 },
            }}
          />
          <Fab
            disabled={authPageStatus === 'loading'}
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
          <EditableListItem
            value={userName || ''}
            label="Name"
            onBlur={onNameFieldBlur}
          />
          <EditableListItem value="roma.sushevskij@yandex.ru" label="Email" />
          <ListItem>
            <ListItemText primary="User ID" secondary="LKUGf324flqks1384rgakSFGOQ8WR" />
          </ListItem>
        </List>
      </Stack>
    </Paper>
  );
};
