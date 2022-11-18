import { FC } from 'react';

import { AuthTabPanelPropsType } from './types';

export const AuthTabPanel: FC<AuthTabPanelPropsType> = ({
  value,
  label,
  children,
}: AuthTabPanelPropsType) => {
  console.log({ value, label, children });

  return <div />;
};
