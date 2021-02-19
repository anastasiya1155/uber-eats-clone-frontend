import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Restaurant } from '../restaurant';

describe('Restaurant', () => {
  it('renders ok with props', () => {
    const { getByText, container } = render(<BrowserRouter>
      <Restaurant id='1' coverImg='http://image' name='Test' categoryName='Category' />
    </BrowserRouter>);
    getByText('Test');
    getByText('Category');
    expect(container.firstChild).toHaveAttribute('href', '/restaurants/1');
  });
});
