import { HStack } from '@chakra-ui/react';
import { ComponentStory } from '@storybook/react';
import React from 'react';
import Button from './Button';

const Template: ComponentStory<typeof Button> = (props) => {
  return (
    <HStack spacing="2">
      <Button {...props}>Demo button</Button>
      <Button {...props} disabled>
        Disabled
      </Button>
      <Button {...props} isLoading loadingText="Loading">
        Submit
      </Button>
    </HStack>
  );
};

export default {
  title: 'Components/Button',
};

export const Default = Template.bind({});
