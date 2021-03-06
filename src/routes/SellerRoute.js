import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const SellerRoute = props => {
  const Component = React.lazy(() =>
    import('../components/Pages/Dashboards/Dashboard'),
  );

  if (props.user.role === 'seller') {
    return (
      <Route {...props}>
        <Component />
      </Route>
    );
  }
  return <Redirect to="/" />;
};

export default connect(({ user }) => ({ user }))(SellerRoute);
