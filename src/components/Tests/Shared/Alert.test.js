import { render, screen, fireEvent } from '@testing-library/react';
import Alert from '../../Shared/Alert';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { alertReducer } from '../../../redux/reducers/alertReducer';

const initialState = {
  text_color: 'blue',
  bg_color: 'red',
  text: 'hello there',
};

const store = createStore(alertReducer, initialState);

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('render Alert component', () => {
  test('should render alert', () => {
    render(
      <Alert alert={{ text: 'hello', text_color: 'red', bg_color: 'blue' }} />,
      { wrapper: Wrapper },
    );
  });
});
