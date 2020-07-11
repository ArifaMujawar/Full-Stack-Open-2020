import React, { useState, useEffect } from "react";
import axios from "axios";
import InputCountry from "./components/InputCountry";
import DisplayCountryInfo from "./components/DisplayCountryInfo";
import DisplayCountries from "./components/DisplayCountries";

const App = () => {
  const [data, setData] = useState("");
  const [country, setCountry] = useState("");

  const handleCountryName = (e) => {
    setCountry(e.target.value);
  };

  useEffect(() => {
    if (country.length > 0) {
      axios
        .get(` https://restcountries.eu/rest/v2/name/${country}`)
        .then((response) => {
          setData(response.data);
        });
    }
  }, [country]);

  return (
    <div>
      <InputCountry handleCountryName={handleCountryName} country={country} />

      {country.length > 0 &&
        data &&
        (Object.keys(data).length < 10 ? (
          <DisplayCountries data={data} />
        ) : (
          <p>Too many matches, specify another filter</p>
        ))}
    </div>
  );
};

export default App;
