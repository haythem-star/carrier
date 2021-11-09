import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from "prop-types";
import { isLogin } from '../utils/auth';
// const isLogin = () => {
//   return true
// }

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) => (isLogin() ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  )
}

PrivateRoute.propTypes = {
    component: PropTypes.object,
};

export default PrivateRoute
