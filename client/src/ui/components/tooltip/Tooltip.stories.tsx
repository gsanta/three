import { Button } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Tooltip from './Tooltip';

export default {
  component: Tooltip,
  title: 'Components/Tooltip',
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (props) => (
  <Tooltip {...props}>
    <Button>Hover me</Button>
  </Tooltip>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Tooltip text',
};
