import React from "react";
import styles from "./Cards.module.css";
import NumberFormat from "react-number-format";

// function Card(props) {
//   return <div>{props.children}</div>;
// }

function Card(props) {
  const { cardColor, cardTitle, cardValue } = props;
  return (
    <div className={`${styles.card} ${styles.neumorphism}`}>
      <span style={{ color: `${cardColor}` }}>{cardTitle}</span>
      <br />
      <span>
        {
          <NumberFormat
            value={cardValue}
            displayType="text"
            thousandSeparator={true}
          />
        }
      </span>
    </div>
  );
}

export default Card;
