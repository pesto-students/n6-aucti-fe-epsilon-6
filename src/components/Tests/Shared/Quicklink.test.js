import { render, screen, fireEvent } from '@testing-library/react';
import Quicklink from '../../Shared/Quicklink';

describe('render product card', () => {
  render(<Quicklink />);
  test('Quicklink loads', () => {
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument;
  });
});
