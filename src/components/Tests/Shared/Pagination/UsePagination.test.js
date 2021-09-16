import { render, screen, fireEvent } from '@testing-library/react';
import usePagination from '../../../Shared/Pagination/usePagination';

describe('  use pagination renders ', () => {
  const { pagination_func } = render(
    <usePagination
      currentPage={1}
      totalCount={2}
      siblingCount={1}
      pageSize={1}
    />,
  );

  test('Paginaion function loads', () => {
    expect(pagination_func).toBeInTheDocument;
  });
});
