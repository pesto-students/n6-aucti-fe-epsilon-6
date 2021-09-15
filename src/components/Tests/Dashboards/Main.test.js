import { render, screen } from '@testing-library/react';
import Header from '../../Pages/Dashboards/Header';
import jest from '@testing-library/jest-dom';

it('renders without crashing', () => {
  shallow(<Header />);
});

it('renders Account header', () => {
  const wrapper = shallow(<App />);
  const welcome = <h1>Display Active Users Account Details</h1>;
  expect(wrapper.contains(welcome)).toEqual(true);
});
