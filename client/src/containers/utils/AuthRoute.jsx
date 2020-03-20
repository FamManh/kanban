import React from 'react';
import { isAuthenticated } from "./auth";
import { Redirect, Route } from 'react-router-dom';

function AuthRoute({ children, ...rest }) {
    const isAuth = isAuthenticated();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuth ? (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                ) : (
                    children
                )
            }
        />
    );
}
export default AuthRoute;
