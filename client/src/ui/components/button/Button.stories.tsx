import { HStack, VStack } from '@chakra-ui/react';
import { ComponentStory } from '@storybook/react';
import React from 'react';
import Button from './Button';

const Template: ComponentStory<typeof Button> = (props) => {
  return (
    <VStack justifyContent="start" spacing="2">
      <HStack spacing="2" width="100%">
        <Button {...props}>Default button</Button>
        <Button {...props} disabled>
          Disabled
        </Button>
        <Button {...props} isLoading loadingText="Loading">
          Submit
        </Button>
      </HStack>
      <HStack spacing="2" width="100%">
        <Button variant="action" {...props}>
          Action button
        </Button>
        <Button {...props} disabled>
          Disabled
        </Button>
        <Button {...props} isLoading loadingText="Loading">
          Submit
        </Button>
      </HStack>
    </VStack>
  );
};

export default {
  title: 'Components/Button',
};

export const Default = Template.bind({});
