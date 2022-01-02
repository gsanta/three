import { message } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../ui/store';

const Notifications = () => {
  const notifications = useSelector((state: RootState) => state.notification.notifications);

  notifications.forEach((notification) => {
    message.info(notification);
  });

  return <div></div>
};

export default Notifications;
