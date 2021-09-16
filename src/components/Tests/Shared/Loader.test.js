import { render, screen } from '@testing-library/react';
import Loader from '../../Shared/Loader';
describe('Loader page', () => {
  render(<Loader />);

  test('does not contain a button', () => {
    const dummy = screen.queryByRole('button');
    expect(dummy).not.toBeInTheDocument;
  });
  test('animation container ', () => {
    const child = screen.queryAllByTestId('loaderanimation');
    expect(child).toBeInTheDocument;
  });
});
