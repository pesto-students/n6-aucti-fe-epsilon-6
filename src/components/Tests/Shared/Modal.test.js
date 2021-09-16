import { render, screen } from '@testing-library/react';
import Modal from '../../Shared/Modal';

describe('Modal Page', () => {
  render(<Modal />);
  test('parent rendered', () => {});
  test('button renders', () => {
    const btn = screen.findByRole('button');
    expect(btn).toBeInTheDocument;
  });
});
