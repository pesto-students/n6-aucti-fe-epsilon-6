import { render, screen } from '@testing-library/react';
import Header from '../../Pages/Dashboards/Header';
import jest from '@testing-library/jest-dom';

jest.mock('react-redux', () => {
  return {
    connect: (mapStateToProps, mapDispatchToProps) => Header => ({
      mapStateToProps,
      mapDispatchToProps,
      Header,
    }),
    Provider: ({ children }) => children,
  };
});
