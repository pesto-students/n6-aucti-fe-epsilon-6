import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
const BuyerRoute = props => {
  if (props.user.role === 'buyer') {
    return <Route {...props} />;
  }
  return <Redirect to="/" />;
};

export default connect(({ user }) => ({ user }))(BuyerRoute);
