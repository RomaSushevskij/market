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
import { Navigate } from 'react-router-dom';

import { EditableListItem } from 'components/editableListItem/editableListItem';
import { routes } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import { signOut, updateEmail, updateProfile } from 'store/reducers';
import {
  selectAuthPageStatus,
  selectEmail,
  selectIsAuth,
  selectPhotoURL,
  selectUserId,
  selectUserName,
} from 'store/selectors';

export const UserProfile: FC = () => {
  const dispatch = useAppDispatch();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const authPageStatus = useAppSelector(selectAuthPageStatus);
  const photoURL = useAppSelector(selectPhotoURL);
  const userName = useAppSelector(selectUserName);
  const userEmail = useAppSelector(selectEmail);
  const userId = useAppSelector(selectUserId);
  const isAuth = useAppSelector(selectIsAuth);

  const onChangeProductImage = (e: ChangeEvent<HTMLInputElement>) => {
    const profileImage = e.target.files && e.target.files[0];

    const imageExtension = profileImage?.name.split('.')[1];
    const imageName = `${userId}.${imageExtension}`;

    dispatch(updateProfile({ photoFile: profileImage, imageName }));
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

  const onEmailFieldBlur = async (
    value: string,
    setEditMode: (isEditMode: boolean) => void,
  ) => {
    const resultAction = await dispatch(updateEmail(value));

    if (updateEmail.fulfilled.match(resultAction)) {
      setEditMode(false);
      dispatch(signOut());
    }
  };

  if (!isAuth) {
    return <Navigate to={routes.AUTH_PAGE} />;
  }

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
            value={userName || 'User name'}
            label="Name"
            onBlur={onNameFieldBlur}
          />
          <EditableListItem
            value={userEmail || ''}
            label="Email"
            onBlur={onEmailFieldBlur}
          />
          <ListItem>
            <ListItemText primary="User ID" secondary="LKUGf324flqks1384rgakSFGOQ8WR" />
          </ListItem>
        </List>
      </Stack>
    </Paper>
  );
};
