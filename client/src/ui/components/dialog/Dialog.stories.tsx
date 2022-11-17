import { ComponentStory } from '@storybook/react';
import React from 'react';
import Button from '../button/Button';
import Dialog from './Dialog';
import DialogBody from './DialogBody';
import DialogFooter from './DialogFooter';

const Template: ComponentStory<typeof Dialog> = (props) => {
  return (
    <div>
      <Dialog {...props} title="Dialog title">
        <DialogBody>Dialog body</DialogBody>
        <DialogFooter>
          <Button variant="action">Approve</Button>
          <Button>Cancel</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default {
  title: 'Components/Dialog',
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
};
