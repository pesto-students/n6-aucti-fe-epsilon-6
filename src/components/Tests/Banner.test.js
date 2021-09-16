import { render, screen, fireEvent } from '@testing-library/react';
import { Banner } from '../../components/Shared/Banner';
import { BrowserRouter as Router } from 'react-router-dom';

describe('render Banners', () => {
  render(
    <Router>
      <Banner />
    </Router>,
  );
  test('Banner1 loads', () => {
    const Banner1 = screen.getByText('Hot Auctions');
    expect(Banner1).toBeInTheDocument;
  });
  test('Banner2 loads', () => {
    const Banner2 = screen.queryByText('Trending');
    expect(Banner2).toBeInTheDocument;
  });
  test('Banner3 loads', () => {
    const Banner3 = screen.queryByText('Latest Products');
    expect(Banner3).toBeInTheDocument;
  });
});
