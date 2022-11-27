import { ReactElement } from 'react';

export type NotificationPropsType = {
  icon: ReactElement;
  title: string;
  linkTitle?: string;
  linkPath?: string;
  children?: any;
};
