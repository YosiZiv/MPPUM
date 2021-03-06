import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
const tokenCheck = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('jwtToken') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/' }} />
      )
    }
  />
);
export default tokenCheck;
