import { FC, ReactNode, SyntheticEvent, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { AuthTabsValueType } from './types';

type TabPanelPropsType = {
  children?: ReactNode;
  value: string;
  label: string;
};

export const AuthForm: FC = () => {
  const [tabValue, setTabValue] = useState<AuthTabsValueType>('Sign In');

  const onTabsChange = (event: SyntheticEvent, newTabValue: AuthTabsValueType) => {
    setTabValue(newTabValue);
  };

  const TabPanel: FC<TabPanelPropsType> = ({ value, label, children }) => {
    return (
      <>
        {value === label && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </>
    );
  };

  return (
    <Box width="100%">
      <Box>
        <Tabs value={tabValue} onChange={onTabsChange}>
          <Tab value="Sign In" label="Sign In" />
          <Tab value="Sign Up" label="Sign Up" />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} label="Sign In">
        Sign In
      </TabPanel>
      <TabPanel value={tabValue} label="Sign Up">
        Sing Up
      </TabPanel>
    </Box>
  );
};
