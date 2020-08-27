import React from "react";
import Card from "./Card";
import styles from "./Cards.module.css";

function Cards(props) {
  const { totalConfirmed, totalRecovered, totalDeaths, country } = props;
  const totalActive = totalConfirmed - (totalRecovered + totalDeaths);
  return (
    <div>
      <div className={styles.Cards}>
        <Card
          cardColor="red"
          cardTitle="Confirmed"
          cardValue={totalConfirmed}
        />
        <Card cardColor="blue" cardTitle="Active" cardValue={totalActive} />
        <Card
          cardColor="green"
          cardTitle="Recovered"
          cardValue={totalRecovered}
        />
        <Card cardColor="gray" cardTitle="Deaths" cardValue={totalDeaths} />
      </div>
      <h1>{country === "" ? "Global" : country} Report</h1>
    </div>
  );
}

export default Cards;
