import { render, screen } from '@testing-library/react';
import ProductSkeletonPage from '../../Pages/ProductPage/ProductSkeltonPage';

describe('Product skeleton Page', () => {
  const { container } = render(<ProductSkeletonPage />);
  test('non empty div rendered', () => {
    expect(container.firstChild).not.toBeEmpty;
  });
  test(' form rendered', () => {
    const form = screen.findByRole('form');
    expect(form).toBeInTheDocument;
  });
});
