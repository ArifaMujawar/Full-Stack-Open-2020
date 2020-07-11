import React, { useEffect, useState } from "react";
import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY;

const DisplayCountryInfo = ({ o, key }) => {
  const [weather, setWeather] = useState([]);
  useEffect(() => {
    if (weather.length === 0) {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${api_key}&query=${o.name}`
        )
        .then((response) => {
          console.log("weather api response ", response.data.current);
          setWeather(response.data.current);
        });
    }
  });
  return (
    <div>
      <h2 key={key}>{o.name}</h2>
      <ul>
        <li>capital {o.capital}</li>
        <li>population {o.population}</li>
      </ul>
      <h3>Spoken languages</h3>
      <ul>
        {o.languages.map((l, index) => {
          return <li key={index}>{l.name}</li>;
        })}
      </ul>
      <img
        alt="flag"
        src={o.flag}
        style={{ height: "100px", width: "100px" }}
      />
      <h3>Weather in {o.capital}</h3>
      {weather && (
        <p>
          <b>temperature: {JSON.stringify(weather.temperature)} Celcius</b>
        </p>
      )}
      <img alt="weather icon" src={weather.weather_icons} />
      <p>
        <b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}
      </p>
    </div>
  );
};

export default DisplayCountryInfo;
