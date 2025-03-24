import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Landing() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger animation after 2 seconds
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 200);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <div
      id="hero"
      className="relative h-[calc(100svh+150px)] w-full overflow-hidden bg-slate-900 z-40"
    >
      <Navbar />
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/earth.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Astronaut Image */}
      <img
        src="/astronaut.png"
        alt="Giorgos as Astronaut floating"
        className={`absolute left-full bottom-1/2 transform -translate-y-1/2 pointer-events-none 
          ${isAnimating ? "animate-float" : ""} w-[600px]`} // Add animation class once the timer is triggered
      />

      {/* Header Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10 gap-10">
        <p className="md:text-xl text-white opacity-70 text-focus-in text-center">
          Exploring the Universe of Code
        </p>

        <h1 className="text-7xl sm:text-8xl lg:text-[10rem] font-bold text-white text-center text-pop-up-top">
          SPACE
        </h1>
      </div>

      <div className="w-full absolute bottom-[180px] flex flex-col items-center animate-bounce">
        <span className="text-white text-xs sm:text-sm">Scroll Down</span>
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>
  );
}
