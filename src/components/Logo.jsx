import React from "react";

export default function Logo() {
  return (
    <div className="logo">
      <img
        src={require("../assets/Weather_App_Clouds.png")}
        alt="logo"
        style={{ height: "36px" }}
      />
      <p className="logoText">Weather App</p>
    </div>
  );
}
