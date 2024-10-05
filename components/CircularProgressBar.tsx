import React from "react";
import styles from "./CircularProgressBar.module.css";

export interface CircularProgressBarProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgressBar = ({
  percentage,
  size = 40,
  strokeWidth = 5,
}: CircularProgressBarProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const color =
    percentage < 40
      ? "rgb(255, 49, 58)"
      : percentage < 75
      ? "rgb(255, 204, 0)"
      : "rgb(52, 199, 89)";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        stroke="lightgrey"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className={styles.progress}
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14px"
        fill={color}
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default CircularProgressBar;
