import { ComponentStory } from '@storybook/react';
import React from 'react';
import Select from './Select';

const Template: ComponentStory<typeof Select> = (props) => {
  return (
    <div>
      <Select w="300px" {...props}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </div>
  );
};

export default {
  title: 'Components/Select',
};

export const Default = Template.bind({});
