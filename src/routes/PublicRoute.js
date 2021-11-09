import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { isLogin } from '../utils/auth';
// const isLogin = () => {
//     return false
//   }


const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};

PublicRoute.propTypes = {
    component: PropTypes.object,
    restricted : PropTypes.bool
};

export default PublicRoute;