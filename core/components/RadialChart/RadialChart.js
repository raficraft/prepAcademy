import React, { useRef, useEffect, useState } from "react";
import { drawCircle, drawRadial } from "./draw";

import styles from "./RadialChart.module.scss";

export default function RadialChart({
  score = 50,
  color = "#FF0000",
  min = 0,
  max = 100,
  size = 100,
  lineWidth = 12,
  strokeStyle = "#0389f0",
  padding = 9,
  labelPosition,
  animationInterval = 1,
  children,
}) {
  const canvasRef = useRef();
  const colorRef = useRef();
  const inputRef = useRef();

  const [inputValue, setInputValue] = useState(0);

  function getColor() {
    let newColor = strokeStyle;

    if (score > 70) {
      newColor = "#209c15";
    } else if (score > 30) {
      strokeStyle = "#d2d531";
    } else if (score > 0) {
      newColor = "#f03203";
    }

    console.log(newColor);
    return newColor;
  }

  console.log(getColor());

  const increment = () => {
    return setInputValue((s) => s + 1);
  };
  8080;
  const getCircle = () => {
    const input = inputRef.current;
    const min = parseInt(input.attributes.min.value);
    const max = parseInt(input.attributes.max.value);

    const colorCircle = colorRef.current;
    const ctx = colorCircle.getContext("2d");
    //draw background circle
    if (score > 0) {
      setTimeout(() => {
        for (let index = 0; index <= score * 1; index++) {
          let ratio = (index - min) / (max - min) / 1;
          setTimeout(() => {
            drawCircle({
              ctx,
              size,
              lineWidth,
              strokeStyle: getColor(),
              padding,
              ratio,
              size,
            });
          }, index * (300 / 60));
        }
      }, animationInterval * 300);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    drawRadial({
      ctx,
      size,
      lineWidth,
      padding,
      strokeStyle: "rgba(216,216,216,1)",
    });
    getCircle(inputValue, score);
  }, []);

  return (
    <div className={styles.radialContainer}>
      {children && labelPosition === "top" && children}
      <div
        className={styles.radialContent}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <canvas width={size} height={size} ref={canvasRef}></canvas>
        <canvas width={size} height={size} ref={colorRef}></canvas>
        <input
          type="hidden"
          value={inputValue}
          ref={inputRef}
          min={min}
          max={max}
          style={{ width: `${size}px`, height: `${size}px` }}
        />
        <input
          type="text"
          value={score === 0 ? "NR" : `${score}%`}
          disabled
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      </div>
      {(children && labelPosition === "bottom") ||
        (children && !labelPosition && children)}
    </div>
  );
}

export const LabelChart = ({ label }) => {
  return <p className={styles.radialLabel}>{label}</p>;
};
