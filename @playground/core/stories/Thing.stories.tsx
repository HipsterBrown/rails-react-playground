import React from 'react';
import { Meta } from '@storybook/react';
import { Thing } from '../src/components/Thing';

export default {
  title: 'Welcome',
  component: Thing,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
} as Meta;

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = Thing.bind({});

Default.args = {};
