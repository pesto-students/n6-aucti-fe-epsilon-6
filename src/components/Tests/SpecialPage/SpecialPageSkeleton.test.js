import { render, screen } from '@testing-library/react';
import { ExperimentalConfigureRelatedItems } from 'react-instantsearch-core';
import SpecialPageSkeleton from '../../../components/Pages/SpecialPage/SpecialPageSkelton';

describe('Special page Skeletion renders ', () => {
  render(<SpecialPageSkeleton />);
  test('skeleton loads', () => {
    const skeleton = screen.findByTestId('specialpageskeleton');
    expect(skeleton).toBeInTheDocument;
  });
});
