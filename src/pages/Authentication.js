import React from "react";
import Logo from "../components/Logo";
import { useAuth0 } from "@auth0/auth0-react";

const Authentication = () => {

  const { loginWithRedirect } = useAuth0();
  return (
    <div className="authentication_container">
      <Logo />
      <p className="wellcome_styles">
        Web Application To Display Weather Information
      </p>
      <div className="logInContainer">
        <button onClick={() => {loginWithRedirect()}} className="logInButton">Log In Here</button>
      </div>
    </div>
  );
};

export default Authentication;
