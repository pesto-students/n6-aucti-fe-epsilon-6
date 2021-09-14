import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const SellerRoute = props => {
  if (props.user.role === 'seller') {
    return <Route {...props} />;
  }
  return <Redirect to="/" />;
};

export default connect(({ user }) => ({ user }))(SellerRoute);
