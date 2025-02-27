/* eslint-disable react/prop-types */
export default function Gauge({ value, min = 0, max = 100 }) {
  // Clamp the value and calculate the percentage.
  const clampedValue = Math.min(Math.max(value, min), max);
  const percentage = (clampedValue - min) / (max - min);
  // For a gauge, we might map value to an angle from -90 to +90 degrees.
  const angle = -90 + percentage * 180; // -90 deg at min, +90 deg at max

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
        const tickAngle = 144 + i * 18; // 11 ticks over 180° (step = 180/10 = 18°)
        const rad = (tickAngle * Math.PI) / 180;
        const inner = 75;
        const outer = 90;
        const x1 = 100 + inner * Math.cos(rad);
        const y1 = 100 + inner * Math.sin(rad);
        const x2 = 100 + outer * Math.cos(rad);
        const y2 = 100 + outer * Math.sin(rad);
        // For labels, we'll add one at the start, middle, and end.
        const label = i === 0 ? "E" : i === 7 ? "50" : i === 14 ? "F" : "";
        const labelRadius = 60;
        const lx = 100 + labelRadius * Math.cos(rad);
        const ly = 100 + labelRadius * Math.sin(rad) + 5; // slight vertical adjustment

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

      {/* Needle */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="40"
        stroke="#ff0000"
        strokeWidth="4"
        transform={`rotate(${angle}, 100, 100)`}
      />

      {/* Center Pivot */}
      <circle cx="100" cy="100" r="5" fill="#ff0000" />
    </svg>
  );
}
