/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export default function FrequencyGame({ onMatch }) {
  // Controlled values from sliders
  const [vertical, setVertical] = useState(
    Math.floor(Math.random() * (90 - 20 + 1)) + 20
  );
  const [widthScale, setWidthScale] = useState(
    Math.floor(Math.random() * (200 - 20 + 1)) + 20
  );
  const [horizontal, setHorizontal] = useState(
    Math.floor(Math.random() * (90 - 20 + 1)) + 20
  );

  const [targetVertical] = useState(70);
  const [targetWidth] = useState(100);
  const [targetHorizontal] = useState(50);

  // Flag to indicate a match
  const [matched, setMatched] = useState(false);
  const tolerance = 2; // acceptable range

  useEffect(() => {
    if (
      Math.abs(vertical - targetVertical) <= tolerance &&
      Math.abs(widthScale - targetWidth) <= tolerance &&
      Math.abs(horizontal - targetHorizontal) <= tolerance
    ) {
      setMatched(true);
      onMatch(true);
    } else {
      setMatched(false);
    }
  }, [
    vertical,
    widthScale,
    horizontal,
    targetVertical,
    targetWidth,
    targetHorizontal,
    onMatch,
  ]);

  return (
    <div className="flex gap-2 h-1/2">
      {/* Red Panel: Range Inputs */}
      <div className="flex-1 bg-blue-950/70 flex flex-col justify-around rounded-lg p-4">
        <div>
          <label className="text-white text-sm">Vertical Position</label>
          <input
            type="range"
            min="0"
            max="100"
            value={vertical}
            onChange={(e) => setVertical(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-white text-xs">Position Y: {vertical}</p>
        </div>
        <div>
          <label className="text-white text-sm">Width Scale</label>
          <input
            type="range"
            min="0"
            max="200"
            value={widthScale}
            onChange={(e) => setWidthScale(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-white text-xs">Frequency: {widthScale}</p>
        </div>
        <div>
          <label className="text-white text-sm">Horizontal Position</label>
          <input
            type="range"
            min="0"
            max="100"
            value={horizontal}
            onChange={(e) => setHorizontal(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-white text-xs">Position X: {horizontal}</p>
        </div>
      </div>

      {/* Blue Panel: Frequency Display */}
      <div
        className={`flex-1 bg-white/90 flex items-center justify-center rounded-lg relative transition-all overflow-hidden ${
          matched ? "border-4 border-green-600" : ""
        }`}
      >
        <div className="w-full h-full relative flex items-center justify-center">
          {/* Static frequency background */}
          <img
            className="w-full object-cover opacity-30 pointer-events-none"
            src="frequency.png"
            alt="Frequency Background"
          />
          {/* Dynamic frequency element */}
          <div
            className="absolute"
            style={{
              left: `${horizontal}%`,
              top: `${vertical}%`,
              width: `${widthScale}%`,
              height: `${widthScale}%`,
              transform: "translate(-50%, -50%)",
              transition: "all 0.2s ease",
            }}
          >
            <img
              className="w-full object-cover pointer-events-none"
              src="frequency.png"
              alt="Dynamic Frequency"
            />
          </div>
        </div>
        {matched && (
          <div className="absolute bottom-4 bg-green-700 px-4 py-2 rounded text-sm">
            Frequency Matched!
          </div>
        )}
      </div>
    </div>
  );
}
