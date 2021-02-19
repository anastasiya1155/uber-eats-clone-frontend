import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('should render ok with props', () => {
    const { getByText } = render(<Button canClick={true} loading={false} actionText='Click' />);
    getByText('Click');
  });
  it('should display loading', () => {
    const { getByText } = render(<Button canClick={true} loading={true} actionText='Click' />);
    getByText('Loading...');
  });
  it('should disable button if cannot click', () => {
    const { container } = render(<Button canClick={false} loading={true} actionText='Click' />);
    expect(container.firstChild).toHaveClass('pointer-events-none');
  });
});
