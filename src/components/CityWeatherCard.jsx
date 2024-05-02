import React from "react";
import { useNavigate } from "react-router-dom";

const CityWeatherCard = ({
  cityName,
  countryName,
  status,
  statusImg,
  temp,
  pressure,
  humidity,
  visibility,
  sunrise,
  sunset,
  windSpeed,
  windDegree,
  tempMin,
  tempMax,
  time,
  onClick,
  backImgUrl,
  bgcolor,
}) => {
  const divStyle = {
    backgroundColor: bgcolor,
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/Dashboard");
  };
  return (
    <div className="city_weather_card_container" onClick={onClick}>
      <div className="city_card_top" style={divStyle}>
        <div className="high_top">
          <button onClick={handleNavigate} className="hidddenButton">
            <img src={require("../assets/back_button.png")} alt="back" />
          </button>
        </div>
        <div className="middle_top">
          <p className="city">
            {cityName}, {countryName}
          </p>
          <p className="time">{time}</p>
        </div>
        <div className="low_top">
          <div className="lower_row_first">
            <div className="imageStatus">
              <img
                src={statusImg}
                alt="statusImage"
                style={{ width: "26px" }}
              />
            </div>
            <p>{status}</p>
          </div>
          <div className="lower_row_second">
            <p className="temp">{temp}°c</p>
            <div>
              <p className="tempValue">Temp Min: {tempMin}°c</p>
              <p className="tempValue">Temp Max: {tempMax}°c</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card_bottom">
        <div className="card_bottom--left">
          <div className="group">
            <p className="title">Pressure: {pressure}hPa</p>
          </div>
          <div className="group">
            <p className="title">Humidity: {humidity}%</p>
          </div>
          <div className="group">
            <p className="title">Visibility: {visibility}km</p>
          </div>
        </div>
        <div className="card_bottom--center">
          <img
            src={require("../assets/arrow.png")}
            alt="arrow"
            style={{ width: "26px" }}
          />
          <p className="title">
            {windSpeed}m/s {windDegree}° Degree
          </p>
        </div>
        <div className="card_bottom--right">
          <div className="group">
            <p className="title">
              Sunrise: {sunrise}
            </p>
            <p className="value"></p>
          </div>
          <div className="group">
            <p className="title">
              Sunset: {sunset}
            </p>
            <p className="value"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityWeatherCard;
