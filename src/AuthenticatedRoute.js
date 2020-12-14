import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Login from './components/login';
import Logout from './components/logout';

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="justify-content-end">
      {isAuthenticated ? <Logout/> : <Login/> }
    </div>
  );
};

export default AuthNav