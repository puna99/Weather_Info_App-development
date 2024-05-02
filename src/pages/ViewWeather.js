import React from "react";
import { useParams } from "react-router";
import CityWeatherCard from "../components/CityWeatherCard";
import Logo from "../components/Logo";
import { useGetWeatherDataQuery } from "../redux/weatherApi";
import LogOut from "../components/LogOut";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Footer from "../components/Footer";

const ViewWeather = () => {
  const { CityCode } = useParams();
  const { data, isFetching, isSuccess } = useGetWeatherDataQuery(CityCode);

  if (isFetching) {
    return (
      <div className="view_weather_container notification">
        <p>City informations Loading...</p>
      </div>
    );
  } else if (isSuccess) {
    return (
      <div className="view_weather_container">
        <LogOut />
        <div className="view_weather_logo">
          <Logo />
        </div>
        <div className="View_card_container">
          <CityWeatherCard
            cityName={data.list[0].name}
            countryName={data.list[0].sys.country}
            status={data.list[0].weather[0].description}
            statusImg={getCardStatusImageUrl(0)}
            temp={data.list[0].main.temp}
            pressure={data.list[0].main.pressure}
            humidity={data.list[0].main.humidity}
            visibility={data.list[0].visibility / 1000}
            sunrise={formatSunTimestamp(data.list[0].sys.sunrise)}
            sunset={formatSunTimestamp(data.list[0].sys.sunset)}
            windSpeed={data.list[0].wind.speed}
            windDegree={data.list[0].wind.deg}
            tempMin={data.list[0].main.temp_min}
            tempMax={data.list[0].main.temp_max}
            time={formatTimestamp(data.list[0].dt)}
            bgcolor={getCardColor(0)}
          />
        </div>
      </div>
    );
  }
};

function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = date.getHours() >= 12 ? "pm" : "am";
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  return `${hours}.${minutes}${period}, ${formattedDate}`;
}

function formatSunTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = date.getHours() >= 12 ? "pm" : "am";
  return `${hours}.${minutes}${period}`;
}

const getCardStatusImageUrl = (idx) => {
  switch (idx) {
    case 0:
      return require("./../assets/broken_clouds.png");
    case 1:
      return require("./../assets/clear_sky.png");
    case 2:
      return require("./../assets/few_clouds.png");
    case 3:
      return require("./../assets/light_ran.png");
    case 4:
      return require("./../assets/mist.png");
    case 5:
      return require("./../assets/few_clouds.png");
    case 6:
      return require("./../assets/clear_sky.png");
    case 7:
      return require("./../assets/broken_clouds.png");
    default:
      return null;
  }
};

const getCardColor = (idx) => {
  switch (idx) {
    case 0:
      return "#378de7";
    case 1:
      return "#6149cb";
    case 2:
      return "#40b681";
    case 3:
      return "#de934e";
    case 4:
      return "#9c3939";
    case 5:
      return "#40b681";
    case 6:
      return "#6149cb";
    case 7:
      return "#378de7";
    default:
      return null;
  }
};

export default withAuthenticationRequired(ViewWeather, {
  onRedirecting: () => (
    <div className="my_app">
      <div className="loading_Container">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
      <Footer />
    </div>
  ),
});
