import React from "react";
import { Line } from "react-chartjs-2";
import styles from "./LineGraph.module.css";

function LineGraph(props) {
  const data = {
    labels: props.xAxis.map((label) => label.substr(0, 10)),
    datasets: [
      {
        label: "Corona Data",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.yAxis,
      },
    ],
  };
  return (
    <div className={styles.LineGraph}>
      <Line data={data} />
    </div>
  );
}

export default LineGraph;
