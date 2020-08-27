import React, { useEffect, useState } from "react";
import LineGraph from "./Chart/LineGraph";
import Cards from "./Cards/Cards";
import axios from "../axios";
import Title from "./Title/Title";
import styles from "./HomePage.module.css";

function HomePage() {
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [loading, setLoading] = useState(false);
  const [covidData, setCovidData] = useState({});
  const [days, setDays] = useState(7);
  const [country, setCountry] = useState("");
  const [covidCountArr, setCovidCountArr] = useState([]);
  const [label, setLabel] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/summary`)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setTotalConfirmed(res.data.Global.TotalConfirmed);
          setTotalRecovered(res.data.Global.TotalRecovered);
          setTotalDeaths(res.data.Global.TotalDeaths);
          setCovidData(res.data);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const _year = d.getFullYear();
    const _month = `0${d.getMonth() + 1}`.slice(-2);
    const _date = d.getDate();
    return `${_year}-${_month}-${_date}`;
  };

  const countryChangeHandler = (event) => {
    setCountry(event.target.value);
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - days));
    getCoronaDataByDateRange(event.target.value, from, to);
  };

  const daysChangeHandler = (event) => {
    event.preventDefault();
    setDays(event.target.value);
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - event.target.value));
    getCoronaDataByDateRange(country, from, to);
  };

  const getCoronaDataByDateRange = (countrySlug, from, to) => {
    axios
      .get(
        `/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`
      )
      .then((res) => {
        console.log(res);

        const yAxisCovidCasesCount = res.data.map((d) => d.Cases);
        const xAxisLabel = res.data.map((d) => d.Date);
        setCovidCountArr(yAxisCovidCasesCount);
        setLabel(xAxisLabel);

        const covidCountryData = covidData.Countries.find(
          (country) => country.Slug === countrySlug
        );
        setTotalConfirmed(covidCountryData.TotalConfirmed);
        setTotalRecovered(covidCountryData.TotalRecovered);
        setTotalDeaths(covidCountryData.TotalDeaths);
        setCountry(covidCountryData.Country);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <p>Fetching Data from server.......</p>;
  }
  return (
    <div>
      <Title />
      <select style={styles} value={country} onChange={countryChangeHandler}>
        <option value="" hidden>
          Select Country
        </option>
        <option value="">Global</option>
        {covidData.Countries &&
          covidData.Countries.map((country) => (
            <option key={country.Slug} value={country.Slug}>
              {country.Country}
            </option>
          ))}
      </select>
      <Cards
        totalConfirmed={totalConfirmed}
        totalRecovered={totalRecovered}
        totalDeaths={totalDeaths}
        country={country}
      />
      <LineGraph yAxis={covidCountArr} xAxis={label} />
      <div>
        <button value="7" onClick={daysChangeHandler}>
          Lastweek
        </button>
        <button value="30" onClick={daysChangeHandler}>
          Last month
        </button>
        <button value="90" onClick={daysChangeHandler}>
          Last 3 months
        </button>
      </div>
    </div>
  );
}

export default HomePage;
