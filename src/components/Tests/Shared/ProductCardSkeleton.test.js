import { render, screen } from '@testing-library/react';
import ProductCardSkeleton from '../../Shared/ProductCardSkelton';

describe('render product card skeleton', () => {
  const { container } = render(<ProductCardSkeleton />);
  test('non empty div rendered', () => {
    expect(container.firstChild).not.toBeEmpty;
  });
});
