import { render, screen } from '@testing-library/react';
import BannerSkeleton from '../../Shared/BannerSkelton';

describe('render banner skeleton', () => {
  const { container } = render(<BannerSkeleton />);
  test('non empty div rendered', () => {
    expect(container.firstChild).not.toBeEmpty;
  });
});
