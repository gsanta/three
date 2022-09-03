import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Box from './Box';

export default {
  title: 'Components/Box',
  component: Box,
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = (props) => <Box {...props} />;

export const WithProps = Template.bind({});
WithProps.args = {
  children: 'Box',
  backgroundColor: 'orange.400',
  color: 'gray.50',
  padding: '1',
  width: '100%',
};
