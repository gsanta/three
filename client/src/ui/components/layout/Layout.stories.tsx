import { ComponentStory } from '@storybook/react';
import React from 'react';
import Box from '../box/Box';
import Layout from './Layout';

const Template: ComponentStory<() => JSX.Element> = () => (
  <Box height="500px">
    <Layout
      header={
        <Box bgColor="orange.200" height="40px">
          Header
        </Box>
      }
      footer={
        <Box bgColor="orange.200" height="40px">
          Footer
        </Box>
      }
    >
      Content
    </Layout>
  </Box>
);

export default {
  title: 'Components/Layout',
};

export const Default = Template.bind({});
