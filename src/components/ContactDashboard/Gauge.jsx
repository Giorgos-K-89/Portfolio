/* eslint-disable react/prop-types */
import "../../styles/Gauge.css";

export default function Gauge({ value, min = 0, max = 100 }) {
  // Clamp the value and calculate the percentage.
  const clampedValue = Math.min(Math.max(value, min), max);
  const percentage = (clampedValue - min) / (max - min);
  // Map value to an angle from -90° to +90°
  const baseAngle = -90 + percentage * 180;

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Outer Circle */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="#0066ff"
        strokeWidth="4"
      />

      {/* Tick Marks & Labels */}
      {Array.from({ length: 15 }).map((_, i) => {
        const tickAngle = 144 + i * 18; // Adjusted tick angle
        const rad = (tickAngle * Math.PI) / 180;
        const inner = 75;
        const outer = 90;
        const x1 = 100 + inner * Math.cos(rad);
        const y1 = 100 + inner * Math.sin(rad);
        const x2 = 100 + outer * Math.cos(rad);
        const y2 = 100 + outer * Math.sin(rad);
        // Labels at first, middle, and last ticks
        const label = i === 0 ? "E" : i === 7 ? "50" : i === 14 ? "F" : "";
        const labelRadius = 60;
        const lx = 100 + labelRadius * Math.cos(rad);
        const ly = 100 + labelRadius * Math.sin(rad) + 5;
        return (
          <g key={i}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#0066ff"
              strokeWidth="2"
            />
            {label && (
              <text
                x={lx}
                y={ly}
                fontSize="14"
                fill="#ffffff"
                textAnchor="middle"
                fontFamily="Orbitron, sans-serif"
              >
                {label}
              </text>
            )}
          </g>
        );
      })}

      {/* Animated Needle */}
      <line
        className="gauge-needle"
        x1="100"
        y1="100"
        x2="100"
        y2="40"
        stroke="#ff0000"
        strokeWidth="4"
        style={{ "--base-angle": `${baseAngle}deg` }}
      />

      {/* Center Pivot */}
      <circle cx="100" cy="100" r="5" fill="#ff0000" />
    </svg>
  );
}
