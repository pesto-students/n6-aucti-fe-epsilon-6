import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const BuyerRoute = props => {
  const Component = React.lazy(() =>
    import('../components/Pages/Dashboards/Buyer/BuyerPayments'),
  );
  if (props.user.role === 'buyer') {
    return (
      <Route path={props.path} render={props => <Component {...props} />} />
    );
  }
  return <Redirect to="/" />;
};

export default connect(({ user }) => ({ user }))(BuyerRoute);
