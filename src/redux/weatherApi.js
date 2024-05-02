import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WEATHER_API_URL } from "../types/APICaller";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const units = "metric";

export const api = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: WEATHER_API_URL }),
  tagTypes: ["WeatherInfo"],
  endpoints: (builder) => ({
    getWeatherData: builder.query({
      query: (cityId) => `?id=${cityId}&units=${units}&appid=${apiKey}`,
      providesTags: (data, args) =>
        data.list.map((weatherdata) => ({
          type: "WeatherInfo",
          id: weatherdata.id,
        })),
    }),
    refreshWeatherData: builder.mutation({
      query: (cityId) => `?id=${cityId}&units=${units}&appid=${apiKey}`,
      invalidatesTags: (returnValue, args) => [
        { type: "WeatherInfo", id: args.cityId },
      ],
    }),
  }),
});

export const { useGetWeatherDataQuery, useRefreshWeatherDataMutation } = api;
