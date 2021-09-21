import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { LinearProgress } from '@material-ui/core';

// https://auth0.com/blog/complete-guide-to-react-user-authentication
export function AuthProtectedRoute({ component, ...args }) {
  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () => <LinearProgress />,
      })}
      {...args}
    />
  );
}
