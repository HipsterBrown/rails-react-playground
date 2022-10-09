import React from 'react';
import * as ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from '../stories/Thing.stories';

const { Default } = composeStories(stories);

describe('Thing', () => {
  it('renders without crashing', () => {
    render(<Default />)
    expect(screen.getByText('Some content required')).toBeInTheDocument()
  });
});
