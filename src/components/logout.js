import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  const { logout } = useAuth0();
  return (
    <button type="button"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
      variant="primary"
      className="btn-margin"
    >
      Log Out
    </button>
  );
};

export default Logout;