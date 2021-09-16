import { render, screen } from '@testing-library/react';
import ConfirmModal from '../../Shared/ConfirmModal';
describe('confirm modal page', () => {
  const { container } = render(<ConfirmModal />);
  test('parent rendered', () => {
    render(<ConfirmModal />);
  });
  test('does not contain a button', () => {
    const dummy = screen.queryByRole('button');
    expect(dummy).not.toBeInTheDocument;
  });
});
