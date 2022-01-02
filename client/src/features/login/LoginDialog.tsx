import { Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../ui/store';
import { openLoginDialogAction } from './loginReducer';


const LoginDialog = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.login.isDialogOpen);
  const closeDialog = () => dispatch({ type: openLoginDialogAction.type, payload: false });

  return (
    <Modal title="Basic Modal" visible={isOpen} onOk={closeDialog} onCancel={closeDialog}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
};

export default LoginDialog;
