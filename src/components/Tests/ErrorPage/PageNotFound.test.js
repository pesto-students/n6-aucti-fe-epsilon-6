import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import PageNotFound from '../../Pages/ErrorPage/PageNotFound';

test('page not found icon loads', () => {
  render(<PageNotFound />);
  const err = screen.getByText('Page not found.');
  expect(err).toBeInTheDocument();
});

test('page not found contains a link to home page', () => {
  render(<PageNotFound />);
  const link = screen.getByText('go back');
  expect(link).toBeInTheDocument();
});
