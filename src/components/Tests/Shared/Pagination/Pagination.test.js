import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../../Shared/Pagination/Pagination';

describe('render Pagination', () => {
  render(
    <Pagination currentPage={1} totalCount={2} siblingCount={1} pageSize={1} />,
  );

  test('Nav loads', () => {
    const Nav = screen.findByLabelText('Page navigation');
    expect(Nav).toBeInTheDocument;
  });

  test('renders 3 buttons', async () => {
    const btn = await screen.queryAllByRole('button');
    expect(btn).toBeInTheDocument;
  });
});
