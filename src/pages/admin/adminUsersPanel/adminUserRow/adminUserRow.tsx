import { FC } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { AdminUserRowProps } from 'pages/admin/adminUsersPanel/adminUserRow/types';

export const AdminUserRow: FC<AdminUserRowProps> = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Roman Sushevskij</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={{ sm: 'row' }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mx: { sm: 4 },
              mt: { sm: 3 },
              alignSelf: { xs: 'center', sm: 'flex-start' },
            }}
          />
          <Box>
            <List>
              <ListItem>
                <ListItemText primary="UID" secondary="LSDJFniqui34bflkfioAD23EFKbsd" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Name" secondary="Roman Sushevskij" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary="roma.sushevskij@yandex.ru" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email verified" secondary="Yes" />
              </ListItem>
            </List>
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
