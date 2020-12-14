import React from "react";
import { Route } from "react-router-dom";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import AuthNav from '../AuthenticatedRoute'

const SecretRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <AuthNav/>,
    })}
    {...args}
  />
);

export default SecretRoute;