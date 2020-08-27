import React from "react";
import styles from "./Title.module.css";

function Title() {
  return (
    <div>
      <h1 style={styles}>
        COVID-
        <mark style={{ color: "blue", background: "none" }}>19 </mark>
        Global Tracker
      </h1>
    </div>
  );
}

export default Title;
