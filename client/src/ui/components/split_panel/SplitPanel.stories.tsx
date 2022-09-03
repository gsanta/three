import { ComponentStory } from '@storybook/react';
import React from 'react';
import SplitPanel from './SplitPanel';

export default { component: SplitPanel };

const Template: ComponentStory<typeof SplitPanel> = ({ ...rest }) => (
  <SplitPanel {...rest}>
    <div>Abdc</div>
    <div>efgh</div>
  </SplitPanel>
);

export const Default = Template.bind({});
