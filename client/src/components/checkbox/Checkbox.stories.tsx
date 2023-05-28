import { ComponentStory } from '@storybook/react';
import React from 'react';
import Checkbox from './Checkbox';

const Template: ComponentStory<typeof Checkbox> = (props) => {
  return (
    <div>
      <Checkbox {...props} />
    </div>
  );
};

export default {
  title: 'Components/Checkbox',
};

export const Default = Template.bind({});
