import { HStack, VStack } from '@chakra-ui/react';
import { ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import Button from './Button';

const Template: ComponentStory<typeof Button> = (props) => {
  const [isToggleOn, setIsToggleOn] = useState(false);

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
        <Button variant="action">Action button</Button>
        <Button disabled>Disabled</Button>
        <Button isLoading loadingText="Loading">
          Submit
        </Button>
      </HStack>
      <HStack spacing="2" width="100%">
        <Button iconName="BiPencil" variant="action" />
        <Button iconName="BiPencil" />
      </HStack>
      <HStack spacing="2" width="100%">
        <Button toggle={isToggleOn ? 'on' : 'off'} onToggle={(state) => setIsToggleOn(state === 'on')}>
          Toggle
        </Button>
      </HStack>
    </VStack>
  );
};

export default {
  title: 'Components/Button',
};

export const Default = Template.bind({});
