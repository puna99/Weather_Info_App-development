import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import WeatherCard from "../components/WeatherCard";
import SearchBar from "../components/SearchBar";
import Logo from "../components/Logo";
import LogOut from "../components/LogOut";
import CityList from "./../cities.json";
import CityExpirationTimeList from "./../expiryTimes.json";
import { useNavigate } from "react-router-dom";
import {
  useGetWeatherDataQuery,
  useRefreshWeatherDataMutation,
} from "../redux/weatherApi";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Footer from "../components/Footer";

import { withAuthenticationRequired } from "@auth0/auth0-react";

const Dashboard = () => {
  //Step1: Extract the CityCodes form cities.json
  const getCityCodes = () => {
    return CityList.List.map((city) => city.CityCode).join(",");
  };

  const cityIds = getCityCodes();

  //Step2: Call the Api for initially fetch the weather Information
  const { data, isLoading, error } = useGetWeatherDataQuery(cityIds);

  //CR: Mutation for different cities to have different expiration times
  const [refreshWeatherMyData] = useRefreshWeatherDataMutation();

  useEffect(() => {
    const setupInterval = (cityCode, intervalTime) => {
      const refreshInterval = setInterval(() => {
        refreshWeatherMyData(cityCode);
      }, intervalTime);

      return () => {
        clearInterval(refreshInterval);
      };
    };
    const countryList = CityExpirationTimeList.List.map((item) => ({
      CityCode: item.CityCode,
      ExpirationTime: item.ExpirationTime,
    }));

    const cleanupFunctions = [];

    for (const { CityCode, ExpirationTime } of countryList) {
      const cleanupFunction = setupInterval(CityCode, ExpirationTime);
      cleanupFunctions.push(cleanupFunction);
    }
    return () => {
      for (const cleanupFunction of cleanupFunctions) {
        cleanupFunction();
      }
    };
  }, [refreshWeatherMyData]);

  const navigate = useNavigate();
  const handleCardClick = (CityCode) => {
    navigate(`/${CityCode}`);
  };

  return (
    <div className="dashboard_container">
      <LogOut />
      <Logo />
      <SearchBar />
      {isLoading ? (
        <div className="notification">Data is Loading...</div>
      ) : error ? (
        <div className="notification">Error: {error}</div>
      ) : (
        <div className="dashboard_card_container">
          <Grid spacing={0} container align="center">
            {data?.list?.map((data, idx) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                key={idx}
                sx={{
                  paddingLeft: 2,
                  paddingRight: 2,
                  paddingTop: 2,
                  paddingBottom: 2,
                }}
              >
                <WeatherCard
                  cityName={CityList.List[idx].CityName}
                  countryName={data.sys.country}
                  statusImg={getCardStatusImageUrl(idx)}
                  status={data.weather[0].description}
                  temp={data.main.temp}
                  pressure={data.main.pressure}
                  humidity={data.main.humidity}
                  visibility={data.visibility / 1000}
                  sunrise={formatSunTimestamp(data.sys.sunrise)}
                  sunset={formatSunTimestamp(data.sys.sunset)}
                  windSpeed={data.wind.speed}
                  windDegree={data.wind.deg}
                  tempMin={data.main.temp_min}
                  tempMax={data.main.temp_max}
                  time={formatTimestamp(data.dt)}
                  bgcolor={getCardColor(idx)}
                  onClick={() => handleCardClick(CityList.List[idx].CityCode)}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
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

export default withAuthenticationRequired(Dashboard, {
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
