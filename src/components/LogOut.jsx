import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export default function LogOut() {
  const { logout } = useAuth0();
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });
  return (
    <div className="logOutContainer">
      <button onClick={() => {logoutWithRedirect()}} className="logOutButton">Log Out</button>
    </div>
  );
}
